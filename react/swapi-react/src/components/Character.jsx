import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../App";
import Planets from "./Planets";
function Character(props) {

  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(import.meta.env.VITE_BASE_URL);
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}characters/${id}`
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const json_response = await response.json();
        setData(json_response);
        console.log(json_response);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchData();
  }, []);


  const fetchPlanet = async () => {
      try {
        console.log(import.meta.env.VITE_BASE_URL);
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}characters/${id}/planet`
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const json_response = await response.json();
        setData(json_response);
        console.log(json_response);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    }



  return (
    <>
      <div>
        <h1>{data.name}</h1>
        <div style={{ display: "flex" }}>
          <div>Height: {data.height}</div>
          <div>Mass: {data.mass}</div>
          <div>Born: {data.birth_year}</div>
        </div>
      </div>
      <div>
        <h2>Home World:</h2>
        <Link
          className="nav-link"
          to={{ pathname: `planets/${data.homeworld}` }}
        >
          <div>

          </div>
        </Link>
      </div>
    </>
  );
}

export default Character;
