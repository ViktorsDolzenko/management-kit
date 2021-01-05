import React from "react";
import { sidebarItemType } from "./sideBarItems";
import "./style.scss";

interface SideBarMenuProps {
  items: sidebarItemType[];
  title: string;
}

export const SideBarMenu = ({ items, title }: SideBarMenuProps) => {
  return (
    <div className="SidebarMenu">
      <span className="SidebarMenu__title">{title}</span>
      <ul className="SidebarMenu__items">
        {items.map((item) => {
          return (
            <li className="SidebarMenu__item" key={item.title}>
              {item.image && (
                <img
                  src={item.image}
                  alt={`${item.title}`}
                  className="SidebarMenu__item--image"
                />
              )}
              {item.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
