import React, { useState } from "react";
import { sidebarItemType } from "./sideBarItems";

import "./sideBarMenu.scss";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';

interface SideBarMenuProps {
  items: sidebarItemType[];
  title: string;
}

export const SideBarMenu = ({ items, title }: SideBarMenuProps) => {
    const [open, setOpen] = useState(false);

    // function to show/hide menu on mobile
    const showList = () => {
        setOpen(!open);
    };

    // media query hook
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-device-width: 1224px)"
    });

    // function to create tooltip from array
    const getTitleForTooltip = (teams: any) => {
        return teams.members?.map((item: any) => item).join('\n');
    };

    // translation hook
    const { t } = useTranslation();

    return (
        <div className="SidebarMenu">
            <span className="SidebarMenu__title" onClick={showList}>
                {title}
            </span>
            <ul className="SidebarMenu__items">
                {items.map((item) => {
                    return (
                        <Link to={item.linkTo ? item.linkTo : '/'}
                            className={`SidebarMenu__item ${open ? "sideBar-opened" : ""}`}
                            key={item.title}
                        >
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={`${item.title}`}
                                    className="SidebarMenu__item--image"
                                />
                            )}
                            {t(`${item.title}`)}
                            {isDesktopOrLaptop && (
                                <div className="SidebarMenu__item--team">
                                    {Boolean(item.members?.length) &&
                                    <Tooltip title={
                                        <div style={{ whiteSpace: 'pre-line' }}>{getTitleForTooltip(item)}</div>
                                    }>
                                        <IconButton>
                                            <GroupsIcon style={{ color: 'white' }}/>
                                        </IconButton>
                                    </Tooltip>
                                    }
                                </div>
                            )}
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
};
