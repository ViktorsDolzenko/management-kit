import React, { useState, useEffect, useContext } from "react";
import { auth } from "Service/firebase";

import { SignUp } from "components/SignUp";
import { Login } from "components/Login";
import { Header } from "components/layout/Header";
import { SideBar } from "components/layout/SideBar";
import { StorageContext } from "context/storage";
import { showLoginForm, showSignUpForm } from "context/actions";

import "./style.scss";
import { animateScroll as scroll } from "react-scroll/modules";
import { useMediaQuery } from "react-responsive";

interface LayoutProps {
  children:
    | React.ReactChildren
    | string
    | number
    | boolean
    | null
      // eslint-disable-next-line no-undef
    | JSX.Element
      // eslint-disable-next-line no-undef
    | JSX.Element[]
    | React.ReactChild
    | React.ReactChild[]
      // eslint-disable-next-line no-undef
    | Element;
  pageTitle?: string;
}

const Layout = ({ children, pageTitle = "TodoeXApp" }: LayoutProps) => {
    const { state, dispatch } = useContext(StorageContext);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const user = auth;

    useEffect(() => {
        // eslint-disable-next-line no-undef
        document.title = pageTitle;
    }, [pageTitle]);

    useEffect(() => {
        if (user) {
            dispatch(showLoginForm(false));
        }
    }, [user]);

    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-device-width: 1224px)"
    });

    const scrollToTop = () => {
        scroll.scrollToTop();
    };

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

            <div className="Layout__content">
                {!isDesktopOrLaptop && (
                    <div className="Layout__scrollToTop " onClick={scrollToTop}>
                        <i className="fas fa-arrow-up" />
                    </div>
                )}
                {children}
            </div>

            {state.isShowLoginForm && (
                <Login
                    onClickClose={() => dispatch(showLoginForm(false))}
                    onSignUpClick={() => dispatch(showSignUpForm(true))}
                />
            )}
            {state.isShowSignUpForm && (
                <SignUp onClickClose={() => dispatch(showSignUpForm(false))} />
            )}
        </div>
    );
};

export { Layout };
