import React from "react";
import { headerItems } from "./headerItems";
import { Button, BUTTON_TYPE } from "components/Button";

import Logo from "../../../svg/logo.svg";
import chatIcon from "svg/chat-button.svg";
import "./header.scss";
import { Followers } from "components/Followers";
import { simpleIcon } from "../../../const";

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
            <Button type={BUTTON_TYPE.simple} titleIcon={simpleIcon} />
          </div>
          <Followers />
          <div className="navbar__buttons">
            <Button title="share" />
            <Button type={BUTTON_TYPE.warning} title="chat" icon={chatIcon} />
          </div>
        </div>
        <div>
          <ul className="navbar__list nav-list">
            {headerItems.map((item) => {
              return (
                <li className="nav-list--item" key={item.title}>
                  <a href="/">{item.title}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
};
