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
  const [filterResults, setFilterResults] = useState([])
  const [noMatches, setNoMatches] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

useEffect(() => {
  localStorage.setItem("results", JSON.stringify(results))
  localStorage.setItem("invalidZip", JSON.stringify(invalidZip))
  localStorage.setItem("name", JSON.stringify(name));
  localStorage.setItem("zipcode", JSON.stringify(zipcode))
}, [results, invalidZip, name, zipcode]);

useEffect(() => {
  if (invalidZip || !name) {
    setResults([])
    setNoMatches("")
    setError("")
  }
}, [invalidZip, name]);

useState(() => {
  const results = JSON.parse(localStorage.getItem("results"))
  const invalidZip = JSON.parse(localStorage.getItem("invalidZip"))
  const name = JSON.parse(localStorage.getItem("name"))
  const zipcode = JSON.parse(localStorage.getItem("zipcode"))
  if (results) {
    setResults(results)
    setFilterResults(results)
    setCheckInputs(true)
    setInvalidZip(invalidZip)
    setName(name)
    setZipcode(zipcode)
  }
}, []);

let validateInputs = (event) => {
  event.preventDefault();
  if (!invalidZip && name) {
    findRestaurants()
  }
  setCheckInputs(true)
}

let findRestaurants = () => {
  setIsLoading(true)
  getRestaurants(zipcode)
  .then((results) => {
    if (typeof results === "string") {
      setError(results)
      setIsLoading(false)
    }
    else {
      let searchResults = results.filter((data) => data["dba_name"].includes(name.toUpperCase()));
      setResultsInState(searchResults)
      setError("")
    }
  })
}

let setResultsInState = (results) => {
  let filteredResults = removeDuplicates(results)
  setResults(cleanData(filteredResults))
  setFilterResults(cleanData(filteredResults))
  setIsLoading(false)
  if (results.length === 0) {
    setNoMatches(true)
  } else {
    setNoMatches(false);
  }
}

let checkZipCode = (zip) => {
  let zipCheck = /^\d{5}$/.test(zip)
    if (!zipCheck) {
      setInvalidZip(true);
    } else if (zipCheck) {
      setInvalidZip(false);
    }
}

let filterResultDisplay = (value) => {
  let newResults
  switch (value) {
    case "Only Show Passes": {
      newResults = results.filter((result) => result.result.includes("Pass")) 
      break;
    }
    case "Only Show Fails": {
      newResults = results.filter((result) =>result.result.includes("Fail")) 
      break;
    }
    default: {
    newResults = [...results]
    }
  }
  return setFilterResults(newResults);
}

  return (
    <section className="home-section">
      <p>Search for a Restaurant in Chicago by Name and Zipcode</p>
      <form>
        <input
          type="number"
          placeholder="Enter Zipcode"
          name="zipcode"
          value={zipcode}
          onChange={(event) => {
            setZipcode(event.target.value);
            checkZipCode(event.target.value);
          }}
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
          <p>Please Enter a Valid Zipcode</p>
        </div>
      )}
      {checkInputs && !name.trim() && (
        <div className="error-container">
          <p className="form-error">Error - Missing Inputs</p>
          <p>Please Enter At Least One Character to Search</p>
        </div>
      )}
      {results.length > 0 && (
        <Results
          filterResultDisplay={filterResultDisplay}
          filterResults={filterResults}
          results={results}
        />
      )}
      {isLoading && (
        <img
          src="/assets/Spinner.gif"
          alt="loading"
          className="loading-spinner"
        /> || "loading..."
      )}
      {noMatches && <p>No Matches</p>}
      {error && (<div className="error-container"> 
        <p>We are having server issues, please try again later</p>
        <p>Error: {error}</p>
      </div>)}
    </section>
  );
};

export default Home;
