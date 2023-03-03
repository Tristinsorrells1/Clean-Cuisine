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
            <img
              className="tired"
              src="https://www.iconsdb.com/icons/preview/green/check-mark-2-xxl.png"
            ></img>
          )}
        </div>
      </NavLink>
    </>
  );
};

export default ResultCard
