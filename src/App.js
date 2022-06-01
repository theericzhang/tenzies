import "./App.css";
import Dice from "./components/Dice.js"
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";

function App() {

    const [dieValues, setDieValues] = useState(setUpArray())
    const [gameState, setGameState] = useState(false)
    const [numberofRolls, setNumberOfRolls] = useState(0)
    const [isFirstPlay, setIsFirstPlay] = useState(true)

    useEffect(() => {
        const isGameWon = dieValues.every(die => (die.value === dieValues[0].value) && (die.isToggled === true))
        setGameState(isGameWon)

        // is it your first play of the game? let's write to storage
        // on every roll. If it's not your first time playing the game
        // then we'll hold the 'rolls' to be compared with newer values
        // in the else block. 
        if (isFirstPlay) {
            localStorage.setItem('rolls', numberofRolls)
        } else {
            const lastnumberOfRolls = localStorage.getItem('rolls')
            // checking to see if winning condition is satisfied to 
            // compare the current value "numberofRolls" to the one in storage 
            if (isGameWon) {
                if (numberofRolls < lastnumberOfRolls) {
                    localStorage.setItem('rolls', numberofRolls)
                }
                else {
                    localStorage.setItem('rolls', lastnumberOfRolls)
                }
            } else {localStorage.setItem('rolls', lastnumberOfRolls)}
        }
    },[dieValues, numberofRolls, isFirstPlay])

    useEffect(() => {
        window.onbeforeunload = function () {
            return "Your scores will be lost if you leave the page, are you sure you want to refresh?"
        }
    }, [])

    // creating a brand new array of dice values containing properties of 
    // numerical value, toggle (locked) status, and an id used for a key 
    // and targeting to manipulate
    function setUpArray() {
        const newArray = []
        for (let i = 0; i < 10; i++) {
            newArray.push(
                {
                    value: Math.ceil(Math.random() * 6),
                    isToggled: false,
                    id: nanoid()
                }
            )
        }
        return newArray;
    }

    // handles a click from the roll button element. we want to check if the
    // die has been locked. if it has been locked, return the same die. 
    // if not, then generate a completely new die in place
    function rollClickHandler() {
        
        setNumberOfRolls(prevRolls => prevRolls + 1)

        //declaratively
        setDieValues(prevState => prevState.map(die => {
            return die.isToggled 
                   ? die 
                   : {
                       value: Math.ceil(Math.random() * 6),
                       isToggled: false,
                       id: nanoid()
                   }
        }))

        //imperatively
        // setDieValues(prevState => {
        //     const tempArray = []
        //     for (let i = 0; i < prevState.length; i++) {
        //         prevState[i].isToggled
        //         ? tempArray.push(prevState[i]) 
        //         : tempArray.push(
        //             {
        //                 value: Math.ceil(Math.random() * 6),
        //                 isToggled: prevState[i].isToggled,
        //                 id: nanoid()
        //             }
        //         )
        //     }
        //     return(tempArray)
        // })
    }

    // using a dieId (generated from nanoid), we can target a die
    // by mapping over a previous state and seeing if each die has a
    // .id property that matches the dieId. Then, we can toggle the 
    // isToggled property to flag it as locked. 
    function dieClickHandler(dieId) {
        
        setDieValues(prevState => prevState.map(die => {
            return die.id === dieId 
            ? {...die, isToggled : !die.isToggled}
            : die
        }))


        
        // imperatively
        // setDieValues(prevState => {
        //     const tempArray = []
        //     for (let i = 0; i < prevState.length; i++) {
        //         i === dieId
        //         ? tempArray.push(
        //             {
        //                 value: prevState[i].value,
        //                 isToggled: !prevState[i].isToggled,
        //                 id: nanoid()
        //             })
        //         : tempArray.push(prevState[i])
        //     }
        //     return(tempArray)
        // })
    }

    // rendering an array of <Dice> objects with props
    const diceSection = dieValues.map((die) => {
        return (
            <Dice value={die.value} 
                  clickHandler={() => dieClickHandler(die.id)}
                  isToggled={die.isToggled}
                  key={die.id}
            />
        )
    })

    

    return (
        <div className="App">
            <main className="game-wrapper">
                <section className="game">
                    {gameState && <ReactConfetti width="640px" height="660px" recycle={false}></ReactConfetti>}
                    <h1 className="title">Tenzies</h1>
                    <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                    <div className="dice-container">
                        {diceSection}
                    </div>
                    <button 
                        className="roll" 
                        onClick={gameState? () => {
                            setDieValues(setUpArray())
                            setNumberOfRolls(0)
                            setIsFirstPlay(false)
                        } : rollClickHandler}>
                            {gameState? "New Game" : "Roll"}
                    </button>
                    <ul className="scores">
                        <li className="rolls">Current number of rolls: {numberofRolls}</li>
                        {
                            isFirstPlay 
                            ? null
                            : <li className="rolls">Your best score: {localStorage.getItem('rolls')}</li>
                        }
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default App;
