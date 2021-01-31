import React, { useEffect, useState } from "react";

import {
  sideBarItemsMenu,
  sideBarItemsProjects,
  sideBarItemsTeams,
} from "components/SideBarMenu/sideBarItems";
import { SideBarMenu } from "components/SideBarMenu";
import { Button, BUTTON_STYLE } from "components/Button";
import { BUTTON_TYPE } from "../../Button/buttonProps";
import { auth } from "../../../firebase";
import { simpleIcon } from "../../../const";

import "./sideBar.scss";

interface SidebarProps {
  onLoginClick: () => void;
}
export const SideBar = ({ onLoginClick }: SidebarProps) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showLogout, setShowLogout] = useState(false);

  const showLogoutButton = () => {
    setShowLogout(!showLogout);
  };
  const hideLogOutButton = () => {
    setShowLogout(false);
  };

  const signOut = () => {
    auth.signOut().then();
  };

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);
  return (
    <div className="sidebar">
      <div>
        <span className="sidebar__header">Projectus</span>
      </div>
      {currentUser && (
        <div className="sidebar__profile">
          <img
            className="sidebar__profile--img"
            src="https://via.placeholder.com/48"
            alt="avatar"
          />
          <div className="sidebar__profile--info">
            <span className="sidebar__profile--info name">
              {currentUser.email}
            </span>
            <span className="sidebar__profile--info vacancy">
              Product Owner
            </span>
          </div>

          {!showLogout && (
            <Button
              category={BUTTON_STYLE.clear}
              titleIcon={simpleIcon}
              onMouseEnter={showLogoutButton}
              type={BUTTON_TYPE.default}
            />
          )}
          {showLogout && (
            <Button
              onMouseLeave={hideLogOutButton}
              title="Sign Out"
              type={BUTTON_TYPE.default}
              category={BUTTON_STYLE.clear}
              onClick={signOut}
            />
          )}
        </div>
      )}
      {!currentUser && (
        <div className="sidebar__profile">
          <Button
            category={BUTTON_STYLE.important}
            onClick={onLoginClick}
            type={BUTTON_TYPE.default}
            title="Login"
          />
        </div>
      )}
      )
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
      <Button category={BUTTON_STYLE.danger} title="+ Add a Project" />
      <SideBarMenu items={sideBarItemsTeams} title="Teams" />
      <Button category={BUTTON_STYLE.danger} title="+ Add a Team" />
    </div>
  );
};
