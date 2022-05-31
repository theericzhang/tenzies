import logo from "./logo.svg";
import "./App.css";
import Dice from "./components/Dice.js"
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";

function App() {

    const [dieValues, setDieValues] = useState(setUpArray())
    const [gameState, setGameState] = useState(false)

    useEffect(() => {
        const isGameWon = dieValues.every(die => (die.value === dieValues[0].value) && (die.isToggled === true))
        setGameState(isGameWon)
    },[dieValues])

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

    function rollClickHandler() {
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
                    {gameState && <ReactConfetti width="640px" height="640px" recycle={false}></ReactConfetti>}
                    <h1 className="title">Tenzies</h1>
                    <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                    <div className="dice-container">
                        {diceSection}
                    </div>
                    <button className="roll" onClick={gameState? () => setDieValues(setUpArray()) : rollClickHandler}>{gameState? "New Game" : "Roll"}</button>
                </section>
            </main>
        </div>
    );
}

export default App;
