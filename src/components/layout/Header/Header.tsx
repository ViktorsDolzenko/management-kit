import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { headerItems } from "./headerItems";
import { Button, BUTTON_STYLE } from "components/Button";
import Logo from "svg/logo.svg";
import chatIcon from "svg/chat-button.svg";
import { simpleIcon } from "const";


import "./header.scss";
import Select from "react-select";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  onMenuClick: () => void;
  isOpenMenu: boolean;
}

const options = [
    { value: 'en', label: 'English' },
    { value: 'lv', label: 'Latviesu' }
];

export const Header = ({ onMenuClick, isOpenMenu }: HeaderProps) => {
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-device-width: 768px)"
    });

    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });

    const { i18n, t } = useTranslation();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };


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
                            <Button category={BUTTON_STYLE.Simple} titleIcon={simpleIcon} title={''} />
                        )}
                        {isTabletOrMobile && (
                            <div className="page-header__menuButton" onClick={onMenuClick}>
                                {!isOpenMenu && <i className="fas fa-bars" />}
                            </div>
                        )}
                    </div>
                    {isDesktopOrLaptop &&
                        // @ts-ignore
                        // eslint-disable-next-line max-len
                        <Select className="page-header__language-select" defaultValue={options[0]} menuPortalTarget={document.body} onChange={(e) => changeLanguage(e?.value)} options={options} />
                    }
                    <div className="navbar__buttons">
                        <Button title="share" />
                        <Link to="/chat">
                            <Button
                                category={BUTTON_STYLE.Warning}
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
                                {isDesktopOrLaptop ? (
                                    <NavLink
                                        end
                                        style={({
                                            isActive
                                        }) => ({ borderBottom: isActive ? "solid #ffc200" : '',
                                            paddingBottom: isActive ? "21px" : '',
                                            borderWidth: isActive ? "1px 2px 2px" : '',
                                            opacity: isActive ? "1" : '' })}
                                        to={item.link}
                                    >
                                        {t(item.title)}
                                    </NavLink>
                                ) : (
                                    <NavLink
                                        end
                                        style={({
                                            isActive
                                        }) => ({ opacity: isActive ? "1" : '' })}
                                        to={item.link}
                                    >
                                        {t(item.title)}
                                    </NavLink>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
};
