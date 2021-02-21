import React, { useState, useEffect, useContext } from "react";
import { auth } from "Service/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { SignUp } from "components/SignUp";
import { Login } from "components/Login";
import { Header } from "components/layout/Header";
import { SideBar } from "components/layout/SideBar";
import { StorageContext } from "context/storage";
import { showLoginForm } from "context/actions";

import "./style.scss";

interface LayoutProps {
  children:
    | React.ReactChildren
    | string
    | number
    | boolean
    | null
    | JSX.Element
    | JSX.Element[]
    | React.ReactChild
    | React.ReactChild[]
    | Element;
  pageTitle?: string;
}

const Layout = ({ children, pageTitle = "TodoeXApp" }: LayoutProps) => {
  const { state, dispatch } = useContext(StorageContext);
  const [isOpenSignUp] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  useEffect(() => {
    if (user) {
      dispatch(showLoginForm(false));
    }
  }, [user]);

  useEffect(() => {}, []);

  return (
    <div className="Layout">
      <div className="Layout__sidebar">
        <SideBar
          onLoginClick={() => dispatch(showLoginForm(true))}
          isOpenMenu={isOpenMenu}
          onMenuClick={() => setIsOpenMenu(!isOpenMenu)}
        />
      </div>

      <div className="Layout__header">
        <Header
          onMenuClick={() => setIsOpenMenu(!isOpenMenu)}
          isOpenMenu={isOpenMenu}
        />
      </div>

      <div className="Layout__content">{children}</div>

      {state.isShowLoginForm && (
        <Login
          onClickClose={() => dispatch(showLoginForm(false))}
          onSignUpClick={() => dispatch(showLoginForm(true))}
        />
      )}
      {isOpenSignUp && (
        <SignUp onClickClose={() => dispatch(showLoginForm(false))} />
      )}
    </div>
  );
};

export { Layout };
