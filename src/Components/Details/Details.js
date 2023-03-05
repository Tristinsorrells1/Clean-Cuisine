import { React, useEffect, useState} from "react";
import "./Details.css";
import { useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import Maps from "./Maps";
import { formatViolations } from "../../util";

const Details = () => {
  const params = useParams();
  const [restaurant, setRestaurant] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem("results"));
    let match = results.find((result) => result.license === params.id);
    console.log(match)
    if (!match) {
      navigate('/error')
    }
    setRestaurant(match);
  }, [navigate, params.id]);

  return (
    <>
      <NavLink to={"/"}>
        <button className="back-button">Back to Results</button>
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
                  `https://www.google.com/maps/dir/?api=1&destination=${restaurant.urlName}%2C${restaurant.city}%2CIL`,
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
                <span> {restaurant.risk}</span>
                <img
                  className="info-icon"
                  src="../../../Assets/info-icon.png"
                  alt="info icon"
                ></img>
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
                  alt="check icon"
                ></img>
              )}
              {restaurant.result === "Fail" && (
                <img
                  className="fail-icon"
                  src="../../../Assets/x-mark.png"
                  alt="fail icon"
                ></img>
              )}
              {(restaurant.result === "Not Ready" ||
                restaurant.result === "No Entry") && (
                <img
                  className="warning-icon"
                  src="../../../Assets/warning.png"
                  alt="warning icon"
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
        <div className="yelp-header">Yelp Reviews</div>
        {restaurant && (
          <div className="yelp-container">
            <iframe
              src={`https://www.yelp.com/search?find_desc=${restaurant.urlName}+&find_loc=Chicago%2C+IL+${restaurant.zip}`}
              alt="Yelp iframe"
              className="yelp-iframe"
              title="yelp-iframe"
            ></iframe>
          </div>
          )}
      </section>
    </>
  );
};

export default Details;