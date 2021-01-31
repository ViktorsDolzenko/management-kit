import React, { useState } from "react";
import { Link } from "react-router-dom";

import { countDownFunc } from "utils";

import "./emptyPage.scss";

export const EmptyPage = () => {
  const [timer, setTimer] = useState<string>("");

  countDownFunc(setTimer);

  return (
    <div className="emptyPage">
      <div className="emptyPage__title">
        <h1>COMING SOON</h1>
        <hr className="emptyPage__divider" />
        <p>{timer}</p>
        <Link to="/" className="emptyPage__text">
          Back To HomePage
        </Link>
      </div>
    </div>
  );
};
