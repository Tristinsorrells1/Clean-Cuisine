import React from "react";
import ResultCard from "../ResultCard/ResultCard";
import "./Results.css"
import Details from "../Details/Details";
import { Route, Routes } from "react-router";

const Results = ({ results }) => {
  let cards = results.map((result) => {
    return (
      <ResultCard
        name = {result["name"]}
        risk = {result.risk}
        address = {result.address}
        city = {result.city}
        zip = {result.zip}
        date = {result["inspection_date"]}
        result = {result["result"]}
        violations = {result.violations}
        license = {result.license}
        key = {result.license}
      />
    )
  })

  return (
    <>
      <section className="results-conatiner">{cards}</section>
    </>
  );
}

export default Results;
