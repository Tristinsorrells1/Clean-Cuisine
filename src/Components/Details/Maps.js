import { React } from "react";
import "./Details.css";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import PropTypes from "prop-types";

const Maps = ({ restaurant }) => {
 
  const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "15px",
  };

  const center = { lat: restaurant.latitude, lng: restaurant.longitude };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  return isLoaded && (
    <GoogleMap
      mapContainerStyle={containerStyle}
      aria-label="Map"
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
            `https://www.google.com/maps/dir/?api=1&destination=${restaurant.urlName}%2C${restaurant.city}%2CIL`,
            "_blank",
            "noreferrer"
          )
        }
      />
    </GoogleMap>
  ) 
}

export default Maps;

Maps.propTypes = {
  restaurant: PropTypes.object.isRequired,
};