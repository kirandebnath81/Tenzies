import React from "react";

export default function TenziesIntro(props) {
  return (
    <div className="tenzies-intro">
      <div>Tenzies Game</div>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{props.introDice}</div>

      <input
        type="text"
        placeholder="enter name"
        onChange={props.tenziesInput}
        className="inputText"
      />
      <button onClick={props.startTenzies} className="playBtn">
        Let's Play
      </button>
    </div>
  );
}
