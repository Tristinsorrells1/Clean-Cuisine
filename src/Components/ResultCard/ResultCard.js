import React from "react";
import "./ResultCard.css"
import { NavLink } from "react-router-dom";



const ResultCard = ({  name, risk, address, city, zip, date, result, violations, license }) => {
  return (
    <>
    <NavLink to={`/${license}`}>
      <div className="result-card">
        <p>{name}</p>
        <p>{result}</p>
      </div>
    </NavLink>
    </>
  )
};

export default ResultCard
