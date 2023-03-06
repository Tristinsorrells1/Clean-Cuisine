import { React } from "react";
import { NavLink} from "react-router-dom";
import "./Error.css"

const Error = () => {
 
  return (
    <section className="error-section">
      <p>404 Error</p>
      <p>Page Not Found</p>
      <NavLink to={"/"}>
        <button className="back-button">Go Back</button>
      </NavLink>
    </section>
  );
};

export default Error;