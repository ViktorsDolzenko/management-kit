import React from "react";
import { headerItems } from "./headerItems";
import { Button, BUTTON_CATEGORY } from "components/Button";

import Logo from "../../../svg/logo.svg";
import chatIcon from "svg/chat-button.svg";
import "./header.scss";
import { Followers } from "components/Followers";
import { simpleIcon } from "../../../const";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="page-header">
      <nav className="navbar">
        <div className="page-header__main">
          <div className="page-header__left-wrapper">
            <a href="/" className="page-header__logo">
              <img className="page-header__img" src={Logo} alt="logo" />
              <span className="page-header__title">WebSite</span>
            </a>
            <Button category={BUTTON_CATEGORY.simple} titleIcon={simpleIcon} />
          </div>
          <Followers />
          <div className="navbar__buttons">
            <Button title="share" />
            <Button
              category={BUTTON_CATEGORY.warning}
              title="chat"
              icon={chatIcon}
            />
          </div>
        </div>
        <div>
          <ul className="navbar__list nav-list">
            {headerItems.map((item) => {
              return (
                <li className="nav-list--item" key={item.title}>
                  <Link to={item.link}>{item.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
};
