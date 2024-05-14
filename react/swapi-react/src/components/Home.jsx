import { useState } from "react";
import CharacterName from "./CharacterName";
import { Link } from "react-router-dom";
const Home = (props) => {

  return (
    <div
      className="card-container"
      style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
    >
      {props.data.map((character) => (
        <Link
          key={character._id}
          className="nav-link"
          to={{ pathname: `character/${character.id}`,  }}
        >
          <CharacterName data={character} onClick={props.handleClick} />
        </Link>
      ))}
    </div>
  );
};

export default Home;
