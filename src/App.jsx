import React from "react";
import Die from "./components/die.jsx";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(randomNumbers());
  const [tenzies, seTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      seTenzies(true);
      console.log("you won");
    }
  }, [dice]);

  function randomNumbers() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(generateNewDie());
    }
    return arr;
  }
  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 10),
      isHeld: false,
      id: nanoid(),
    };
  }

  function rollDice() {
    //not reroll the whole dices and excempt the ones that have been clicked
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setDice(randomNumbers());
      seTenzies(false);
    }
  }

  function holdDice(id) {
    setDice(
      dice.map((die) => {
        if (die.id === id) {
          return { ...die, isHeld: !die.isHeld };
        }
        return die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      isHeld={die.isHeld}
      key={die.id}
      value={die.value}
      holdDice={() => holdDice(die.id)}
    />
  ));
  console.log(randomNumbers());

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice--container">{diceElements}</div>
      <button className="roll--dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
