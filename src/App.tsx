import React from 'react';
import {Header} from "./components/layout/Header/Header";
import "./scss/styles.scss"
import {SideBar} from "./components/layout/SideBar/SideBar";

export const App = () => {
  return (
      <div>
  <Header/>
  <SideBar/>
      </div>
  );
}
