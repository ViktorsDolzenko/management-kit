import React from "react";
import {
  sideBarItemsMenu,
  sideBarItemsProjects,
  sideBarItemsTeams,
} from "../../SideBarMenu/sideBarItems";
import { SideBarMenu } from "../../SideBarMenu";
import "./sideBar.scss";
import { Button, BUTTON_TYPE } from "../../Button";
import { simpleIcon } from "../../../const";

export const SideBar = () => {
  return (
    <div className="sidebar">
      <div>
        <span className="sidebar__header">Projectus</span>
      </div>
      <div className="sidebar__profile">
        <img
          className="sidebar__profile--img"
          src="https://via.placeholder.com/48"
          alt="avatar"
        />
        <div className="sidebar__profile--info">
          <span className="sidebar__profile--info name">Name Surname</span>
          <span className="sidebar__profile--info vacancy">Product Owner</span>
        </div>
        <Button type={BUTTON_TYPE.clear} titleIcon={simpleIcon} />
      </div>
      <div className="sidebar__tasks">
        <div className="sidebar__tasks completed">
          <span className="completed__count">372</span>
          <span className="completed__title">Completed Tasks</span>
        </div>
        <div className="sidebar__tasks open-tasks">
          <span className="open-tasks__count">11</span>
          <span className="open-tasks__title">Open Tasks</span>
        </div>
      </div>
      <SideBarMenu items={sideBarItemsMenu} title="Menu" />
      <SideBarMenu items={sideBarItemsProjects} title="Projects" />
      <Button type={BUTTON_TYPE.danger} title="+ Add a Project" />
      <SideBarMenu items={sideBarItemsTeams} title="Teams" />
      <Button type={BUTTON_TYPE.danger} title="+ Add a Team" />
    </div>
  );
};
