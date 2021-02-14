import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { close, countDownFunc, open } from "utils";
import { SideBar } from "../../layout/SideBar";
import { Header } from "../../layout/Header";
import { Login } from "../../Login";
import { SignUp } from "../../SignUp";

import "./emptyPage.scss";
import { auth } from "../../../firebase";

export const EmptyPage = () => {
  const [timer, setTimer] = useState<string>("");
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
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

  const openSignUp = () => {
    close(setIsOpenLogin);
    open(setIsOpenSignUp);
  };

  return (
    <div className="page-container">
      <div className="page-container__sidebar">
        <SideBar
          onLoginClick={() => open(setIsOpenLogin)}
          isOpenMenu={isOpenMenu}
        />
      </div>

      <div className="page-container__header">
        <Header
          onMenuClick={() => setIsOpenMenu(!isOpenMenu)}
          isOpenMenu={isOpenMenu}
        />
      </div>
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
