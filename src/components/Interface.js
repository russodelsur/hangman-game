// Main interface component where the app is put together.

import React from "react";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';

import Mapping from "./Mapping.js";
import Letters from "./Letters";
import dictionaryArray from "./Dictonary";

import state1 from "../img/state1.GIF";
import state2 from "../img/state2.GIF";
import state3 from "../img/state3.GIF";
import state4 from "../img/state4.GIF";
import state5 from "../img/state5.GIF";
import state6 from "../img/state6.GIF";
import state7 from "../img/state7.GIF";
import state8 from "../img/state8.GIF";
import state9 from "../img/state9.GIF";
import state10 from "../img/state10.gif";
import state11 from "../img/state11.GIF";

// Creating an array with all images.
const statesArray = [state1, state2, state3, state4, state5, state6, state7, state8, state9, state10, state11];

// Create a function component that will generate a random word
function getRandomWord(array) {
    const randomNumber = Math.floor(Math.random()*12345);
    return array[randomNumber].toUpperCase().split("");
  };
// Function that add hyphens between the letters of the word.
const addHyphens = (word) => word.map(() => "-");

// passing function thought dictonary array.
let newRandWord = getRandomWord(dictionaryArray);

//passing function through random array of words and adding hyphens
let hyphen = addHyphens(newRandWord);

// Create my Game component
function Game() {
  
  //Use state management below for all state variables
  const [state, setState] = useState(hyphen);
  const [counter, setCounter] = useState(0);
  const [image, setImage] = useState(statesArray[0]);
  const [imgInd, setImgIndex] = useState(1);
  const [winCount, addWin] = useState(0);
  const [lostCount, addLost] = useState(0);
  const [result, setResult] = useState(true);
  const [display, setDisplay] = useState(false);

  // useEffect for when the state word matches the random word (winning scenario)
  useEffect(() => {
    if (state.join("") === newRandWord.join("")) {
      setDisplay(true);
      setResult(true);
      setCounter(0);
      setState([hyphen]);
    } else if (imgInd === 11) {
      setState([newRandWord]);
      setDisplay(true);
      setResult(false);
      setCounter(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgInd, counter]);

  // Create a handleResult hook that will reset all of the states and increment the loosing or winning score
  // depending on the button clicked
  const handleResult = (e) => {
    const button = e.target.innerText;
    newRandWord = getRandomWord(dictionaryArray);
    hyphen = addHyphens(newRandWord);
    setState(hyphen.map((l) => l));

    setImgIndex(1);
    setImage(statesArray[0]);
    setDisplay(false);

    if (button === "Continue") {
      if (imgInd === 11) {
        addLost((next) => next + 1);
      } else {
        addWin((next) => next + 1);
      }
    } else {
      addLost(0);
      addWin(0);
    }
  };

  // Handle click function to check if the letter matches a letter in the word - replace hyphen with the letter.
  // if statement that switches to next image in array if letter is not found
    const handleClick = (e) => {
      const button = e.target.innerText;
      newRandWord.forEach((letter, index) => {
        if (button === letter) {
          hyphen[index] = letter;
          setState(hyphen.map((l) => l));
          setCounter((next) => next + 1);
        }
      });
    if (!newRandWord.includes(button)) {
      setImage(statesArray[imgInd]);
      setImgIndex((next) => next + 1);
    }
  };

  return (
    <div className="container">
      <div className="restart"><Button variant="secondary" onClick={handleResult}>Restart</Button></div>
      {/* switching the class of the div to make it appear using state, and to display winning or losing message */}
      <div className={display ? "visible" : "hidden"}>
        <h1>{result ? "You Won!" : "You Lost!"}</h1>
          {/* Added bottom to restart from 0 or continue playing */}
          <Button variant="secondary" onClick={handleResult}>Restart</Button>
          <Button variant="success" onClick={handleResult}>Continue</Button>
      </div>
      <div className="header">
          <h2>Hangman Game</h2>
        <div className="score">
          <h4>Won: <span>{winCount}</span> games</h4>
          <h4>Lost: <span>{lostCount}</span> games</h4>
        </div>
      </div>
      <div className="game">
        <img className="image" src={image} alt="hangman" />
          <div className="words">
            {/*Mapping through letters in array*/}
            <Mapping className="letters" state={state} />
          </div>
          {/* displaying letters */}
          <Letters handleClick={handleClick} />
      </div>
    </div>
  );
};

export default Game;
