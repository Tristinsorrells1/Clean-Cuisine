import React from "react";
import "./ResultCard.css"

const ResultCard = ({  name, risk, address, city, zip, date, results, violations, license }) => {
  return (
  <div className="result-card">
    <p>{name}</p>
    <p>{results}</p>
  </div>
  )
};

export default ResultCard
