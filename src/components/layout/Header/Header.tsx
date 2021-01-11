import React from "react";
import { headerItems } from "./headerItems";
import Logo from "../../../svg/logo.svg";
import "./header.scss";
import { Followers } from "../../Followers/Followers";
import { CustomButton } from "../../CustomButton/CustomButton";
import { ButtonType } from "../../CustomButton/buttonProps";

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
            <CustomButton type={ButtonType.showmore} />
          </div>
          <Followers />
          <div className="navbar__buttons">
            <CustomButton type={ButtonType.share} title="share" />
            <CustomButton type={ButtonType.chat} title="chat" />
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
