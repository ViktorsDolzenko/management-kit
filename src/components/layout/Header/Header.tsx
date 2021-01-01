import React from 'react';
import Logo from "../../../svg/logo.svg"

export const Header = () => {
    return (
       <header className="page-header">
           <nav className="navbar">
               <div className="page-header__main">
                   <div className="page-header__left-wrapper">
           <a href="/" className="page-header__logo">
               <img className="page-header__img" src={Logo} alt="logo" />
               <span className="page-header__title">WebSite</span>
           </a>
                   <button className="navbar__button showmore">
                       <i className="fas fa-ellipsis-h"/>
                   </button>
                   </div>
                   <div>
                   <button className="navbar__button share">Share</button>
                   <button className="navbar__button chat">Chat</button>
                   </div>
               </div>
             <div>
                 <ul className="navbar__list nav-list">
                     <li className="nav-list--item"><a href="/">Tasks</a></li>
                     <li className="nav-list--item"><a href="/">Kanban</a></li>
                     <li className="nav-list--item"><a href="/">Activity</a></li>
                     <li className="nav-list--item"><a href="/">Calendar</a></li>
                     <li className="nav-list--item"><a href="/">Files</a></li>
                 </ul>
             </div>
           </nav>
       </header>
    );
};
