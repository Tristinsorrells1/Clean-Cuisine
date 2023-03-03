import { React, useEffect, useState, useFetch, useCallback } from "react";
import "./Details.css";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "15px",
};

export default function Reviews({ restaurant }) {
  const [map, setMap] = useState(null);
  const center = restaurant.location;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  // useEffect(() => {
  //   const getID = async () => {
  //     try {
  //       const config = {
  //         method: "get",
  //         url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${restaurant.location}&radius=1500&keyword=${restaurant.name}&key=YOUR_API_KEY`,
  //         headers: { "Access-Control-Allow-Origin": "*" },
  //         withCredentials: true,
  //       };
  //       const response = await axios(config);
  //       console.log(JSON.stringify(response.data));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getID();
  // }, [restaurant.location, restaurant.name]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      zoom={15}
      center={center}
      options={{
        mapTypeControl: false,
      }}
    >
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <></>
  );
}
