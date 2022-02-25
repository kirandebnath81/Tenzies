import React, { useEffect, useState } from "react";

import "./Style/styles.css";

import Die from "./Components/Die";
import TenziesIntro from "./Components/TenziesIntro";

import { v4 as uuidv4 } from "uuid";
import Confetti from "react-confetti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  //Dice Intro
  const [showIntro, setShowIntro] = useState(true);
  // Dice
  const [dice, setDice] = useState(() => allNewDie());
  const [tenzies, setTenzies] = useState(false);
  // Record Name
  const [userName, setUserName] = useState("");
  const [savedName, setSavedName] = useState(
    localStorage.getItem("recordHolder")
  );
  // Record Roll
  const [rollCount, setRollCount] = useState(0);
  const [savedRoll, setSavedRoll] = useState(localStorage.getItem("diceRoll"));
  // Record Time
  const [startGame, setStartGame] = useState(false);
  const [time, setTime] = useState(0);
  const [savedTime, setSavedTime] = useState(
    localStorage.getItem("recordTime")
  );

  useEffect(() => {
    // allDiceHeld && allDiceMath
    const allDieHeld = dice.every((die) => die.isHeld);
    const allDieMatch = dice.every((die) => die.value === dice[0].value);

    if (allDieHeld && allDieMatch) {
      setStartGame(false);
      setTenzies(true);
      if (savedRoll === null || rollCount < savedRoll) {
        localStorage.setItem("diceRoll", rollCount);
        localStorage.setItem("recordHolder", userName);
        localStorage.setItem("recordTime", time);
        toast.success("Hurrah! You have made new record", { theme: "dark" });
      }
      setSavedRoll(localStorage.getItem("diceRoll"));
      setSavedName(localStorage.getItem("recordHolder"));
      setSavedTime(localStorage.getItem("recordTime"));
    } else {
      setTenzies(false);
    }
  }, [dice, rollCount, savedRoll, userName, time]);

  useEffect(() => {
    const timer = setInterval(() => {
      startGame && setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [startGame]);

  const startTenzies = () => {
    setShowIntro((prevState) => !prevState);
  };

  const tenziesInput = (event) => {
    setUserName(event.target.value);
  };

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      id: uuidv4(),
      isHeld: false,
    };
  }

  function allNewDie() {
    const newDie = [];
    for (let i = 0; i < 12; i++) {
      newDie.push(generateNewDie());
    }
    return newDie;
  }

  const start = () => {
    setStartGame((prevState) => !prevState);
  };

  const rollDice = () => {
    if (tenzies) {
      setDice(allNewDie());
      setRollCount(0);
      setTime(0);
      setShowIntro(true);
    } else {
      setDice((prevDice) =>
        prevDice.map((die) => (die.isHeld ? die : generateNewDie()))
      );
      setRollCount((prevCount) => prevCount + 1);
    }
  };

  const heldDie = (id) => {
    startGame &&
      setDice((prevDice) =>
        prevDice.map((die) =>
          die.id === id ? { ...die, isHeld: !die.isHeld } : die
        )
      );
  };

  const diceElement = dice.map((die) => (
    <Die key={die.id} {...die} heldDie={heldDie} start={startGame} />
  ));

  const introDiceELement = dice.map((die) => <Die key={die.id} {...die} />);

  return (
    <>
      <div>
        {showIntro ? (
          <TenziesIntro
            startTenzies={startTenzies}
            tenziesInput={tenziesInput}
            introDice={introDiceELement}
          />
        ) : (
          <main>
            {tenzies && <Confetti />}
            <ToastContainer position="top-center" />
            <div className="tenzies-record">
              <div className="currentRoll">
                <p>
                  Your Roll :
                  <span>{rollCount < 10 ? "0" + rollCount : rollCount}</span>
                </p>
                <p>
                  Your Time : <span>{time < 10 ? "0" + time : time}</span> s
                </p>
              </div>
              {savedRoll && (
                <div>
                  <h3 className="hoderName">
                    Record Holder : <span>{savedName}</span>
                  </h3>
                  <h3 className="recordRoll">
                    Record Roll :
                    <span>{savedRoll < 10 ? "0" + savedRoll : savedRoll}</span>
                  </h3>
                  <h3 className="recordTime">
                    Record Time :
                    <span>{savedTime < 10 ? "0" + savedTime : savedTime}</span>
                  </h3>
                </div>
              )}
            </div>

            <div className="dice-container">{diceElement}</div>
            <div className="btns">
              {startGame ? (
                <button className="gameBtn rollBtn" onClick={rollDice}>
                  {tenzies ? "New Game" : "Roll"}
                </button>
              ) : tenzies ? (
                <button className="gameBtn rollBtn" onClick={rollDice}>
                  {tenzies ? "New Game" : "Roll"}
                </button>
              ) : (
                <button className="gameBtn  startBtn" onClick={start}>
                  Start
                </button>
              )}
            </div>
          </main>
        )}
      </div>
    </>
  );
}
