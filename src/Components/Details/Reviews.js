
import { React, useEffect, useState, useFetch, useCallback } from "react";
import "./Details.css";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "15px",
};

export default function Reviews({ restaurant }) {
  const [map, setMap] = useState(null);
  const center = { lat: restaurant.latitude, lng: restaurant.longitude };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  useEffect(() => {
    const getDetails = () => {
      console.log(restaurant)
       axios({
         method: "get",
         url: `api/place/nearbysearch/json?location=${restaurant.latitude}, ${restaurant.longitude}&radius=1500&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
         withCredentials: true,
       });
      }
      getDetails()
  }, [restaurant.place_id]);

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