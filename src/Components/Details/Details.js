import { React, useEffect, useState} from "react";
import "./Details.css";
import { useParams } from "react-router-dom";
import { getRestaurant } from "../../APICalls";
import { cleanData, removeDuplicates } from "../../util";

const Details = (  ) => {
  const params = useParams()
  const [restaurant, setRestaurant] = useState("")

useEffect(() => {
   getRestaurant(params)
   .then((results) => {
     let filteredResults = removeDuplicates(results);
     let cleanedData = cleanData(filteredResults)[0]
     setRestaurant(cleanedData);
  })
}, []);

  return (
    <section>
      <div>
        <h2>{restaurant.name}</h2>
        <h2>tesst</h2>
      </div>
    </section>
  );
};

export default Details;
