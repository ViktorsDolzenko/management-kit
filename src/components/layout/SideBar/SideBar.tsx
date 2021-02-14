import React, { useContext, useEffect, useState } from "react";

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
import { useMediaQuery } from "react-responsive";
import { StorageContext } from "../../../context/storage";

interface SidebarProps {
  onLoginClick: () => void;
  isOpenMenu: boolean;
  onMenuClick: () => void;
}
export const SideBar = ({
  onLoginClick,
  isOpenMenu,
  onMenuClick,
}: SidebarProps) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showLogout, setShowLogout] = useState(false);
  const { state } = useContext(StorageContext);

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
  }, [currentUser]);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

  const getDoneTasksLength = state.tasks.filter((tasks) => tasks.done).length;

  return (
    <div
      className={`sidebar ${
        !isDesktopOrLaptop && isOpenMenu ? "sidebar-opened" : ""
      } `}
    >
      {!isDesktopOrLaptop && (
        <div className="sidebar__close">
          <i className="fas fa-times" onClick={onMenuClick} />
        </div>
      )}
      {isDesktopOrLaptop && (
        <div>
          <span className="sidebar__header">Projectus</span>
        </div>
      )}
      {currentUser && (
        <div className="sidebar__profile">
          <img
            className="sidebar__profile--img"
            src="https://via.placeholder.com/48"
            alt="avatar"
          />
          <div className="sidebar__profile--info">
            <span className="sidebar__profile--info name">
              {currentUser.displayName}
            </span>
            <span className="sidebar__profile--info vacancy">
              Product Owner
            </span>
          </div>
          {!showLogout && isDesktopOrLaptop && (
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

          {!isDesktopOrLaptop && (
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
      <div className="sidebar__tasks">
        <div className="sidebar__tasks completed">
          <span className="completed__count">{getDoneTasksLength}</span>
          <span className="completed__title">Completed Tasks</span>
        </div>
        <div className="sidebar__tasks open-tasks">
          <span className="open-tasks__count">{state.tasks.length}</span>
          <span className="open-tasks__title">Open Tasks</span>
        </div>
      </div>
      <SideBarMenu items={sideBarItemsMenu} title="Menu" />
      <SideBarMenu items={sideBarItemsProjects} title="Projects" />
      {isDesktopOrLaptop && (
        <Button category={BUTTON_STYLE.danger} title="+ Add a Project" />
      )}
      <SideBarMenu items={sideBarItemsTeams} title="Teams" />
      {isDesktopOrLaptop && (
        <Button category={BUTTON_STYLE.danger} title="+ Add a Team" />
      )}
    </div>
  );
};
