import React from 'react';
import {sideBarItemsMenu, sideBarItemsProjects, sideBarItemsTeams} from "./sideBarItems";
import './sideBar.scss'

export const SideBar = () => {
    return (
        <div className="sidebar">
            <div>
            <span className="sidebar__header">Projectus</span>
            </div>
            <div className="sidebar__profile">
                <img className="sidebar__profile--img" src="https://via.placeholder.com/48" alt="avatar"/>
                <div className="sidebar__profile--info">
                    <span className="sidebar__profile--info name">Name Surname</span>
                    <span className="sidebar__profile--info vacancy">Product Owner</span>
                </div>
                <button className="sidebar__profile--showmore button">
                    <i className="fas fa-ellipsis-h"/>
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
            <div className="menu-container">
            <span className="sidebar__title">Menu</span>
           <ul className="sidebar__menu">
               {sideBarItemsMenu.map((item, index) => {
                   return <li className="sidebar__menu--item" key={index}>{item}</li>
               })}

           </ul>
            </div>
            <div className="menu-container">
                <span className="sidebar__title">Projects</span>
            <ul className="sidebar__menu">
                {sideBarItemsProjects.map((item,index) => {
                    return <li className={`sidebar__menu--item ${item.classname}`} key={index}>{item.title}</li>
                })}
            </ul>
            </div>
            <div className="menu-container">
                <span className="sidebar__title">Teams</span>
            <ul className="sidebar__menu">
                {sideBarItemsTeams.map((item, index) => {
                    return <li className="sidebar__menu--item" key={index}>{item}</li>
                })}
            </ul>
            </div>
        </div>
    );
};
