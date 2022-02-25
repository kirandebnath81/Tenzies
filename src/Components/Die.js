import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "white" : "black",
    color: props.isHeld ? "black" : "white",
  };

  const diceValue = () => {
    switch (props.value) {
      case 1:
        return <i className="fa-solid fa-dice-one"></i>;
      case 2:
        return <i className="fa-solid fa-dice-one"></i>;
      case 3:
        return <i className="fa-solid fa-dice-three"></i>;
      case 4:
        return <i className="fa-solid fa-dice-four"></i>;
      case 5:
        return <i className="fa-solid fa-dice-five"></i>;
      case 6:
        return <i className="fa-solid fa-dice-six"></i>;
      default:
        return <i className="fa-solid fa-dice-one"></i>;
    }
  };

  return (
    <div
      className="die-face"
      onClick={() => props.heldDie(props.id)}
      style={styles}
    >
      {diceValue()}
    </div>
  );
}
