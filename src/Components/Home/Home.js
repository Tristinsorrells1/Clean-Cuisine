import React, { useState } from "react";
import "./Home.css";

const Home = () => {

  const [zipcode, setZipcode] = useState("")
  const [name, setName] = useState("")


  return (
    <section className="home-section">
      <p>Search for a Chicago Restaurant by name, zipcode, or both</p>
      <form>
        <input
          type="number"
          placeholder="Enter Zipcode"
          name="zipcode"
          value={zipcode}
        />
        <input
          type="text"
          placeholder="Restaurant Name"
          name="name"
          value={name}
        />
        <button>Search</button>
      </form>
    </section>
  );
};

export default Home;
