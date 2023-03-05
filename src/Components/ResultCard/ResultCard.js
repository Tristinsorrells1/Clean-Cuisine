import React from "react";
import "./ResultCard.css"
import { NavLink } from "react-router-dom";



const ResultCard = ({  name, risk, address, city, zip, date, result, violations, license }) => {
  return (
    <>
      <NavLink to={`/${license}`} className="NavLink">
        <div className="result-card">
          <div className="name-container">
            <p className="card-name">{name}</p>
          </div>
          <div className="result-container">
            <p className="card-result">{result}</p>
          </div>
          {result.includes("Pass") && (
            <img className="check" src="../../../Assets/check.png"></img>
          )}
          {result.includes("No Entry") && (
            <img
              className="warning"
              src="../../../Assets/warning.png"
            ></img>
          )}
          {result.includes("Not Ready") && (
            <img
              className="warning"
              src="../../../Assets/warning.png"
            ></img>
          )}
          {result.includes("Fail") && (
            <img
              className="fail"
              src="../../../Assets/x-mark.png"
            ></img>
          )}
        </div>
      </NavLink>
    </>
  );
};

export default ResultCard
