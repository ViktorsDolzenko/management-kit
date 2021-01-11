import React from "react";
import { Header } from "./components/layout/Header";
import { SideBar } from "./components/layout/SideBar";
import { Tasks } from "./components/Tasks";
import "./scss/styles.scss";
import { TaskDescription } from "./components/TaskDescription";

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
        <div className="App__content--taskList">
          <Tasks />
        </div>
        <div className="App__content--task">
          <TaskDescription />
        </div>
      </div>
    </div>
  );
};
