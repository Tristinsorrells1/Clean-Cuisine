import React from "react";
import "./ResultCard.css"
import { NavLink } from "react-router-dom";



const ResultCard = ({  name, risk, address, city, zip, date, result, violations, license }) => {
  return (
    <>
    <NavLink to={`/${license}`} className="NavLink">
      <div className="result-card">
        <p className="card-name">{name}</p>
        <p className="card-result">{result}</p>
      </div>
    </NavLink>
    </>
  )
};

export default ResultCard
