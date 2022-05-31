import logo from "./logo.svg";
import "./App.css";
import Dice from "./components/Dice.js"
import { useState } from "react";
import { nanoid } from "nanoid";

function App() {

    const [dieValues, setDieValues] = useState(setUpArray())

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
                    <div className="dice-container">
                        {diceSection}
                    </div>
                    <button className="roll" onClick={rollClickHandler}>Roll</button>
                </section>
            </main>
        </div>
    );
}

export default App;
