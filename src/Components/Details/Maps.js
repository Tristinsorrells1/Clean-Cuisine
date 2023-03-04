import { React,  useState, useCallback } from "react";
import "./Details.css";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";


const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "15px",
};

export default function Maps({ restaurant }) {

  const [map, setMap] = useState(null);
  const center = { lat: restaurant.latitude, lng: restaurant.longitude };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

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
      <Marker
        position={center}
        title={restaurant.name}
        onClick={() =>
          window.open(
            `https://www.google.com/maps/dir/?api=1&destination=${restaurant.urlName}%2CChicago%2CIL`,
            "_blank",
            "noreferrer"
          )
        }
      />
    </GoogleMap>
  ) : (
    <></>
  );
}