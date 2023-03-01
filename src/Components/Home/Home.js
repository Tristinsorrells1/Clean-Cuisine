import React, { useState } from "react";
import "./Home.css";
import getRestaurants from "../../APICalls.js"
import {cleanData } from "../../util"

const Home = () => {

  const [zipcode, setZipcode] = useState("")
  const [name, setName] = useState("")
  const [invalidZip, setInvalidZip] = useState("")
  const [emptyInputs, setEmptyInputs] = useState("")
  const [results, setResults] = useState([])

  let checkInputs = (event) => {
    event.preventDefault();
    let zipCheck = /^\d{5}$/.test(zipcode)
    if (zipcode && !zipCheck) {
      setInvalidZip(true)
    }
    else if (!zipcode || zipCheck) {
      setInvalidZip(false)
    }
    if (zipcode.trim() || name.trim()) {
      setEmptyInputs(false)
      findRestaurants()
    }
    else {
      setEmptyInputs(true);
    }
  }

  let findRestaurants = () => {
    let searchResults
    getRestaurants(zipcode, name)
    .then((results) => {
      console.log("results", results)
      searchResults = results.filter((data) => data["dba_name"].includes(name.toUpperCase()));
      setResultsInState(searchResults)
    })

let setResultsInState = (results) => {
  let filteredResults = results.reduce((accum, result) => {
    if (!accum.length) {
      accum.push(result)
    }
    let findDuplicates = accum.filter((item) => item["license_"] === result["license_"]);
    if (!findDuplicates.length) {
      accum.push(result)
    }
    return accum
  }, [])
  setResults(cleanData(filteredResults))
  }
}

  return (
    <section className="home-section">
      <p>Search for a Chicago Restaurant by name, zipcode, or both</p>
      <form>
        <input
          type="number"
          placeholder="Enter Zipcode"
          name="zipcode"
          value={zipcode}
          onChange={(event) => setZipcode(event.target.value)}
        />
        <input
          type="text"
          placeholder="Restaurant Name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button onClick={(event) => checkInputs(event)}>Search</button>
      </form>
      {invalidZip && (
        <div className="error-container">
          <p className="form-error">Error - Invalid Zipcode</p>
          <p>Please enter a valid zipcode, or search by name instead.</p>
        </div>
      )}
      {emptyInputs && !invalidZip && (
        <div className="error-container">
          <p className="form-error">Error - Missing Inputs</p>
          <p>Please enter a zipcode, and/or a restaurant's name</p>
        </div>
      )}
    </section>
  );
};

export default Home;
