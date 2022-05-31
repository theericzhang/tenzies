import React from "react";

export default function Dice ({ value, clickHandler, isToggled }) {
    return (
        <div className="die" onClick={clickHandler} id={isToggled? "green" : ""}>
            <h2 className="value">{value}</h2>
        </div>
    )
}