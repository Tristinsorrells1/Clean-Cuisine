import { React, useState, useEffect} from "react";
import "./Home.css";
import { getRestaurants } from "../../APICalls.js"
import {cleanData, removeDuplicates } from "../../util"
import Results from "../Results/Results"

const Home = () => {

  const [zipcode, setZipcode] = useState("")
  const [name, setName] = useState("")
  const [invalidZip, setInvalidZip] = useState(true)
  const [results, setResults] = useState([])
  const [checkInputs, setCheckInputs] = useState(false)

useEffect(() => {
  localStorage.setItem("results", JSON.stringify(results))
}, [results]);

useState(() => {
  const results = JSON.parse(localStorage.getItem("results"));
  console.log("state", results)
  if (results) {
    setResults(results);
  }
}, []);

  let validateInputs = (event) => {
    event.preventDefault();
    let zipCheck = /^\d{5}$/.test(zipcode)
    if (!zipCheck) {
      setInvalidZip(true)
    }
    else if (zipCheck) {
      setInvalidZip(false)
    }
    if (zipCheck && name) {
      findRestaurants()
    }
    setCheckInputs(true)
  }

let findRestaurants = () => {
  getRestaurants(zipcode)
  .then((results) => {
    let searchResults = results.filter((data) => data["dba_name"].includes(name.toUpperCase()));
    setResultsInState(searchResults)
  })
}

let setResultsInState = (results) => {
  let filteredResults = removeDuplicates(results)
  setResults(cleanData(filteredResults))
}

  return (
    <section className="home-section">
      <p>Search for a Restaurant by its name and zipcode</p>
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
        <button onClick={(event) => validateInputs(event)}>Search</button>
      </form>
      {checkInputs && invalidZip && (
        <div className="error-container">
          <p className="form-error">Error - Invalid Zipcode</p>
          <p>Please enter a valid zipcode, or search by name instead.</p>
        </div>
      )}
      {checkInputs && !name.trim() && (
        <div className="error-container">
          <p className="form-error">Error - Missing Inputs</p>
          <p>Please enter a Restaurant name</p>
        </div>
      )}
     {results && <Results results={results}/>}
    </section>
  );
};

export default Home;
