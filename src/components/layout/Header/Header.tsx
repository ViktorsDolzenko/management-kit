import React from "react";
import { NavLink, Link } from "react-router-dom";
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
              </div>
            )}
          </div>
          {isDesktopOrLaptop && <Followers />}
          <div className="navbar__buttons">
            <Button title="share" />
            <Link to="/chat">
              <Button
                category={BUTTON_STYLE.warning}
                title="chat"
                icon={chatIcon}
              />
            </Link>
          </div>
        </div>
        <ul className="navbar__list nav-list">
          {headerItems.map((item) => {
            return (
              <li className="nav-list--item" key={item.title}>
                <NavLink
                  exact={true}
                  activeStyle={{
                    borderBottom: "solid #ffc200",
                    paddingBottom: "21px",
                    borderWidth: "1px 2px 2px",
                    opacity: "1",
                  }}
                  to={item.link}
                >
                  {item.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
