import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";
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
  return <p>{data.name}</p>;
}

export default Character;
