import React from "react";
import "./ResultCard.css"
import { NavLink } from "react-router-dom";



const ResultCard = ({  name, risk, address, city, zip, date, results, violations, license }) => {
  return (
    <>
    <NavLink to={`/${license}`}>
      <div className="result-card">
        <p>{name}</p>
        <p>{results}</p>
      </div>
    </NavLink>
    </>
  )
};

export default ResultCard
