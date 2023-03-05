import React from "react";
// Create a component that display every element from an array
function Mapping({ state }){
  let i = 1;
  return (
    <>
      {/* Mapping through the array */}
      {state.map((letter) => {
        i++;
        // returning a div element for every letter.
        return (
          <div className="letter" key={i}>
            {letter}
          </div>
        );
      })}
    </>
  );
};

export default Mapping;
