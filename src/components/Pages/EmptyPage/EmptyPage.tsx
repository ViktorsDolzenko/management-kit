import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { close, countDownFunc, open } from "utils";
import { SideBar } from "../../layout/SideBar";
import { Header } from "../../layout/Header";
import { Login } from "../../Login";
import { SignUp } from "../../SignUp";

import "./emptyPage.scss";

export const EmptyPage = () => {
  const [timer, setTimer] = useState<string>("");

  useEffect(() => {
    let interval: any;

    interval = setInterval(() => {
      countDownFunc(setTimer);
    });

    return () => clearInterval(interval);
  }, [timer]);

  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);

  const openSignUp = () => {
    close(setIsOpenLogin);
    open(setIsOpenSignUp);
  };

  return (
    <div className="page-container">
      <div className="page-container__sidebar">
        <SideBar onLoginClick={() => open(setIsOpenLogin)} />
      </div>

      <div className="page-container__header">
        <Header />
      </div>
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
      {isOpenLogin && (
        <Login
          onClickClose={() => close(setIsOpenLogin)}
          onSignUpClick={openSignUp}
        />
      )}
      {isOpenSignUp && <SignUp onClickClose={() => close(setIsOpenSignUp)} />}
    </div>
  );
};
