import React from "react";
import { Link } from "react-router-dom";

import "./notFoundPage.scss";

export const NotFoundPage = () => {
  return (
    <div className="notFoundPage">
      <div className="notFoundPage__title">
        <h1>404</h1>
        <h3>Oops... Page Not found</h3>
        <hr className="notFoundPage__divider" />
        <Link to="/" className="notFoundPage__text">
          Back To HomePage
        </Link>
      </div>
    </div>
  );
};
