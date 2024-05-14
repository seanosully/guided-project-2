import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import "./assets/site.css";
import Home from "./components/Home";
import Character from "./components/Character";
import Planets from "./components/Planets";

export const UserContext = createContext();

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [characterId, setCharacterId] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(import.meta.env.VITE_BASE_URL);
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}characters`);
        console.log(response);
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const json_response = await response.json();
        setData(json_response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = async (characterId) => {
     try {
       console.log(import.meta.env.VITE_BASE_URL);
       const response = await fetch(
         `${import.meta.env.VITE_BASE_URL}character/${characterId}`
       );
       console.log(response);
       if (!response.ok) {
         throw new Error("Data could not be fetched!");
       }
       const json_response = await response.json();
       setData(json_response);
       console.log(response);
     } catch (error) {
       console.error("Error fetching characters:", error);
     }
  }

  return (
    <>
      <UserContext.Provider value={characterId}>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <div>
                  <h1>Star Wars Universe Lookup</h1>
                  <Home data={data} />
                </div>
              }
            />
            <Route path="/character/:id" element={<Character />} />
            <Route path="/planets/:id" element={<Planets />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
