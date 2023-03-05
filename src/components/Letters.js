// Component where I create a button with all the letters of the alphabet

import React from "react";
import Button from "react-bootstrap/Button";

function Letters({ handleClick }){

  // I am getting everyletter from the alphabet usign the charcode. 
  // Learned how to use that in the link below:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  // Creating a button for every letter in the array.
  const button = alphabet.map((letter) => (
    <Button variant="dark" onClick={handleClick} style={{fontSize:"1rem", padding: ".5rem", height:"50px", width:"50px"}} className="letter-button rounded-circle" key={alphabet.indexOf(letter)}>
      {letter}
    </Button>
  ));
  return <div className="buttons">{button}</div>;
};
export default Letters;
