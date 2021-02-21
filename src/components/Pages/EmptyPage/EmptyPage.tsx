import { Layout } from "components/layout/Layout";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { close, countDownFunc, open } from "utils";

import "./emptyPage.scss";
import { auth } from "Service/firebase";

export const EmptyPage = () => {
  const [timer, setTimer] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  useEffect(() => {
    let interval: any;

    interval = setInterval(() => {
      countDownFunc(setTimer);
    });

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <Layout pageTitle="Not found">
      <div>
        <div className="page-container__emptyContent">
          <div className="emptyPage">
            <div className="emptyPage__title">
              <h1>Welcome {currentUser ? currentUser.displayName : "Guest"}</h1>
              <h1>This page is on reconstruction </h1>
              <hr className="emptyPage__divider" />
              <p>{timer}</p>
              <Link to="/" className="emptyPage__text">
                Back To HomePage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
