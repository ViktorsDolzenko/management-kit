import React from 'react';
import {Header} from "components/layout/Header/Header";
import {SideBar} from "components/layout/SideBar";
import "./scss/styles.scss"

export const App = () => {
  return (
      <div>
  <Header/>
  <SideBar/>
      </div>
  );
}
