import { React} from "react";
import ResultCard from "../ResultCard/ResultCard";
import "./Results.css"

const Results = ({ results, filterResults, filterResultDisplay }) => {

  if (filterResults !== 0) {
    results = filterResults
  }

  let cards = filterResults.map((result) => {
    return (
      <ResultCard
        name={result["name"]}
        risk={result.risk}
        address={result.address}
        city={result.city}
        zip={result.zip}
        date={result["inspection_date"]}
        result={result["result"]}
        violations={result.violations}
        license={result.license}
        key={result.license}
      />
    );
  });

  const handleClick = () => {
    let filterValue = document.getElementById("filterResults");
    filterResultDisplay(filterValue.value);
  };

  return (
    <>
      <form className="filter-form">
        <select id="filterResults">
          <option>Filter Results By:</option>
          <option>Only Show Passes</option>
          <option>Only Show Fails</option>
          <option>Show All</option>
        </select>
        <input
          type="button"
          onClick={handleClick}
          value="Filter Results"
          className="filter-button"
        ></input>
      </form>
      <section className="results-conatiner">{cards}</section>
      {cards.length === 0 && <p>No Matches Found</p>}
    </>
  );
};

export default Results;
