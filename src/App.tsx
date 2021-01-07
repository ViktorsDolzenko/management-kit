import React from "react";
import { Header } from "./components/layout/Header/Header";
import { SideBar } from "./components/layout/SideBar/SideBar";
import "./scss/styles.scss";
import { Tasks } from "./components/Tasks/Tasks";

export const App = () => {
  return (
    <div>
      <Header />
      <SideBar />
      <Tasks />
    </div>
  );
};
