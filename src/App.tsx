import React from "react";
import { Header } from "./components/layout/Header/Header";
import { SideBar } from "./components/layout/SideBar/SideBar";
import "./scss/styles.scss";
import { Tasks } from "./components/Tasks/Tasks";

export const App = () => {
  return (
    <div className="App">
      <div className="App__sidebar">
        <SideBar />
      </div>

      <div className="App__header">
        <Header />
      </div>

      <div className="App__content">
        <Tasks />
      </div>
    </div>
  );
};
