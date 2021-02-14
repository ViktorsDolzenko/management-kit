import React, { useState } from "react";
import { sidebarItemType } from "./sideBarItems";

import "./sideBarMenu.scss";
import { useMediaQuery } from "react-responsive";

interface SideBarMenuProps {
  items: sidebarItemType[];
  title: string;
}

export const SideBarMenu = ({ items, title }: SideBarMenuProps) => {
  const [open, setOpen] = useState(false);

  const showList = () => {
    setOpen(!open);
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

  return (
    <div className="SidebarMenu">
      <span className="SidebarMenu__title" onClick={showList}>
        {title}
      </span>
      <ul className="SidebarMenu__items">
        {items.map((item) => {
          return (
            <li
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
              {item.title}
              {isDesktopOrLaptop && (
                <div className="SidebarMenu__item--team">
                  {Boolean(item.team?.length) &&
                    item.team?.map((person) => (
                      <img
                        className="SidebarMenu__item--team-image"
                        src={person}
                        alt={person}
                        key={person}
                      />
                    ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
