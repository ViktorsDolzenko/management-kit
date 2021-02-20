import React, { useState } from "react";

import { close, open } from "../../../utils";
import { SideBar } from "../../layout/SideBar";
import { Header } from "../../layout/Header";
import { Login } from "../../Login";
import { SignUp } from "../../SignUp";

import "./chatPage.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { ChatRoom } from "components/ChatRoom/ChatRoom";

export const ChatPage = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [user] = useAuthState(auth);

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
          onMenuClick={() => setIsOpenMenu(!isOpenMenu)}
        />
      </div>

      <div className="page-container__header">
        <Header
          onMenuClick={() => setIsOpenMenu(!isOpenMenu)}
          isOpenMenu={isOpenMenu}
        />
      </div>
      {user && (
        <div className="page-container__chat">
          <ChatRoom />
        </div>
      )}
      {!user && (
        <Login
          onClickClose={() => close(setIsOpenLogin)}
          onSignUpClick={openSignUp}
        />
      )}
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
