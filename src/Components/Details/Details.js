import { React, useState, useEffect} from "react";
import "./Details.css";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Maps from "./Maps"


const Details = (  ) => {
  const params = useParams()
  const [restaurant, setRestaurant] = useState("")
 

useState(() => {
   const results = JSON.parse(localStorage.getItem("results"));
   let match = results.find((result) => result.license === params.id)
   setRestaurant(match)
   
}, [params.id]);

useEffect(() => {
  window.addEventListener("message", handleMessage);

  return () => {
    window.removeEventListener("message", handleMessage);
  };
}, []);

const handleMessage = (event) => {
  if (event.origin === "http://localhost:3000") {
    document.cookie = "cookieName=cookieValue; SameSite=None; Secure";
    console.log("handled")
  }
};

const setCookie = () => {
  window.top.postMessage(
    "setCookie",
    "https://clean-cuisine-1zo3z7exr-tristinsorrells1.vercel.app'"
  );
  console.log("iframe load")
};

  return (
    <>
      <NavLink to={"/"}>
        <button>Back to Results</button>
      </NavLink>
      <section className="details-section">
        <div className="address-and-iframe-container">
          <div className="name-and-address-container">
            <h2>{restaurant.name}</h2>
            <p className="street">{restaurant.address}</p>
            <p className="city">{`${restaurant.city}, IL`}</p>
            <p className="zip">{restaurant.zip}</p>
          </div>
          <div className="map">
            <Maps restaurant={restaurant} />
          </div>
        </div>
        <div>
          <div className="inspection-results-header">Inspection Results</div>
          <div className="inspection-details">
            <p className="date">{`Date of Inspection: ${restaurant.date}`}</p>
            <p className="risk">{`${restaurant.risk}`}</p>
            <p className="result">{`Result: ${restaurant.result}`}</p>
          </div>
        </div>

        <div>
          <div className="violation-header">Violations</div>
          <div className="violation-details">
            <p className="date">{restaurant.violations}</p>
          </div>
        </div>

        <div className="yelp-container">
          <div className="yelp-header">Yelp Reviews</div>
        </div>
        {setCookie()}
        {restaurant && (
          <iframe
            src={`https://www.yelp.com/search?find_desc=${restaurant.urlName}+&find_loc=Chicago%2C+IL+${restaurant.zip}`}
            className="yelp-iframe"
            onLoad={() => console.log("Yelp iframe loaded")}
          ></iframe>
        )}
      </section>
    </>
  );
};

export default Details;
