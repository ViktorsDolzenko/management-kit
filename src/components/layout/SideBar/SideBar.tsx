import React from 'react';

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
           <ul className="sidebar__menu">
               <li className="sidebar__menu--item title">Menu</li>
               <li className="sidebar__menu--item">Home</li>
               <li className="sidebar__menu--item">My Tasks</li>
               <li className="sidebar__menu--item">Notifications</li>
           </ul>
            <ul className="sidebar__menu">
                <li className="sidebar__menu--item title">Projects</li>
                <li className="sidebar__menu--item dashboard">Dashboard UI Kit</li>
                <li className="sidebar__menu--item crm">CRM System</li>
                <li className="sidebar__menu--item redesign">Website Redesign</li>
                <li className="sidebar__menu--item tool">Communication Tool</li>
            </ul>
            <ul className="sidebar__menu">
                <li className="sidebar__menu--item title">Teams</li>
                <li className="sidebar__menu--item designers">Designers</li>
                <li className="sidebar__menu--item Backend">Backend</li>
                <li className="sidebar__menu--item Frontend">Frontend</li>
            </ul>
        </div>
    );
};
