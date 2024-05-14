import React from "react";

const CharacterName = (props) => {
  return (
    <>
      
        <div id="characterList">
          <p>{props.data.name}</p>
        </div>
      
    </>
  );
};

export default CharacterName;
