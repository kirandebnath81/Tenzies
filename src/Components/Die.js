import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "rgb(87, 8, 139)" : "white",
    color: props.isHeld ? "white" : "black",
  };

  return (
    <div
      className="die-face"
      onClick={() => props.heldDie(props.id)}
      style={styles}
    >
      {props.value}
    </div>
  );
}
