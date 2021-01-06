import React from "react";
import {
  sideBarItemsMenu,
  sideBarItemsProjects,
  sideBarItemsTeams,
} from "../../SideBarMenu/sideBarItems";
import { SideBarMenu } from "../../SideBarMenu/SideBarMenu";
import "./sideBar.scss";

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
        <button className="sidebar__profile--showmore button">
          <i className="fas fa-ellipsis-h" />
        </button>
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
      <button className="sidebar__button button">+ Add a Project</button>
      <SideBarMenu items={sideBarItemsTeams} title="Teams" />
      <button className="sidebar__button button">+ Add a Team</button>
    </div>
  );
};
