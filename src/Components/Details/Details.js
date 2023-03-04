import { React, useState, useEffect } from "react";
import "./Details.css";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Maps from "./Maps";
import { formatViolations } from "../../util";

const Details = () => {
  const params = useParams();
  const [restaurant, setRestaurant] = useState("");

  useState(() => {
    const results = JSON.parse(localStorage.getItem("results"));
    let match = results.find((result) => result.license === params.id);
    setRestaurant(match);
  }, []);

  return (
    <>
      <NavLink to={"/"}>
        <button>Back to Results</button>
      </NavLink>
      <section className="details-section">
        <div className="address-and-iframe-container">
          <div className="name-and-address-container">
            <h2>{restaurant.name}</h2>
            <div className="address-container">
              <p className="street">{restaurant.address}</p>
              <p className="city">{`${restaurant.city}, IL`}</p>
              <p className="zip">{restaurant.zip}</p>
            </div>
            <button
              className="directions-button"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${restaurant.urlName}%2CChicago%2CIL`,
                  "_blank",
                  "noreferrer"
                )
              }
            >
              Directions
            </button>
          </div>
          <div className="map">
            <Maps restaurant={restaurant} />
          </div>
        </div>
        <div>
          <div className="inspection-results-header">Inspection Results</div>
          <div className="inspection-details">
            <p className="date">{`Date of Inspection: ${restaurant.date}`}</p>
            <div className="risk">
              <div className="risk-level">
                <a> {restaurant.risk}</a>
                <img className="info-icon" src="../../../Assets/info-icon.png"></img>
              </div>
              <div id="riskExplaination">
                <ul>
                  Food service establishments are compared to facilities that
                  are in the same risk level.
                  <li>Risk Level 1: inspected once per year</li>
                  <li>Risk Level 2: inspected every 9 months</li>
                  <li> Risk Level 3: inspected twice per year</li>
                  <li>Risk Level 4: inspected 3 - 4 times per year</li>
                </ul>
              </div>
            </div>
            <div className="result">
              {`Result: ${restaurant.result}`}
              {(restaurant.result === "Pass" ||
                restaurant.result === "Pass w/ Conditions") && (
                <img
                  className="check-icon"
                  src="../../../Assets/check.png"
                ></img>
              )}
              {restaurant.result === "Fail" && (
                <img
                  className="fail-icon"
                  src="../../../Assets/x-mark.png"
                ></img>
              )}
              {(restaurant.result === "Not Ready" ||
                restaurant.result === "No Entry") && (
                <img
                  className="warning-icon"
                  src="../../../Assets/warning.png"
                ></img>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="violation-header">Violations</div>
          <div className="violation-details">
            {formatViolations(restaurant)}
          </div>
        </div>

        <div className="yelp-container">
          <div className="yelp-header">Yelp Reviews</div>
        </div>
        {/* {restaurant && (
            <iframe
              src={`https://www.yelp.com/search?find_desc=${restaurant.urlName}+&find_loc=Chicago%2C+IL+${restaurant.zip}`}
              className="yelp-iframe"
            ></iframe>
          )} */}
      </section>
    </>
  );
};

export default Details;
