import React from "react";
import "./ResultCard.css";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const ResultCard = ({  name, result, license }) => {

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
              className="check"
              src="../../../Assets/check.png"
              alt="Check icon"
            ></img>
          )}
          {result.includes("No Entry") && (
            <img
              className="warning"
              src="../../../Assets/warning.png"
              alt="Warning icon"
            ></img>
          )}
          {result.includes("Not Ready") && (
            <img
              className="warning"
              src="../../../Assets/warning.png"
              alt="Warning icon"
            ></img>
          )}
          {result.includes("Fail") && (
            <img className="fail" src="../../../Assets/x-mark.png" alt="Fail icon"></img>
          )}
        </div>
      </NavLink>
    </>
  );
};

export default ResultCard

ResultCard.propTypes = {
  name: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
  license: PropTypes.string.isRequired,
};