import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { headerItems } from "./headerItems";
import { Button, BUTTON_STYLE } from "components/Button";
import Logo from "svg/logo.svg";
import chatIcon from "svg/chat-button.svg";
import { Followers } from "components/Followers";
import { simpleIcon } from "const";

import "./header.scss";

interface HeaderProps {
  onMenuClick: () => void;
  isOpenMenu: boolean;
}

export const Header = ({ onMenuClick, isOpenMenu }: HeaderProps) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1149px)" });

  return (
    <header className="page-header">
      <nav className="navbar">
        <div className="page-header__main">
          <div className="page-header__left-wrapper">
            <a href="/" className="page-header__logo">
              <img className="page-header__img" src={Logo} alt="logo" />
              <span className="page-header__title">ToDoeX</span>
            </a>
            {isDesktopOrLaptop && !isTabletOrMobile && (
              <Button category={BUTTON_STYLE.simple} titleIcon={simpleIcon} />
            )}
            {isTabletOrMobile && (
              <div className="page-header__menuButton" onClick={onMenuClick}>
                {!isOpenMenu && <i className="fas fa-bars" />}
                {isOpenMenu && <i className="fas fa-times" />}
              </div>
            )}
          </div>
          {isDesktopOrLaptop && <Followers />}
          <div className="navbar__buttons">
            <Button title="share" />
            <Button
              category={BUTTON_STYLE.warning}
              title="chat"
              icon={chatIcon}
            />
          </div>
        </div>
        <ul
          className={`navbar__list nav-list ${
            isOpenMenu ? "header-opened" : ""
          }`}
        >
          {headerItems.map((item) => {
            return (
              <li className="nav-list--item" key={item.title}>
                <Link to={item.link}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
