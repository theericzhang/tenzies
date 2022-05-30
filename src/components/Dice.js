import React from "react";

export default function Dice ({ value, clickHandler, index, isToggled }) {
    return (
        <div className="die" onClick={() => clickHandler(index)} id={isToggled? "green" : ""}>
            <h2 className="value">{value}</h2>
        </div>
    )
}