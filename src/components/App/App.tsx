import React from "react";
import { Header } from "../layout/Header";
import { SideBar } from "../layout/SideBar";
import { Tasks } from "../Tasks";
import "./app.scss";
import { TaskDescription } from "components/TaskDescription";
import { StorageProvider } from "../../context/storage";

export const App = () => {
  return (
    <StorageProvider>
      <div className="App">
        <div className="App__sidebar">
          <SideBar />
        </div>

        <div className="App__header">
          <Header />
        </div>

        <div className="App__content">
          <div className="App__content-taskList">
            <Tasks />
          </div>
          <div className="App__content-task">
            <TaskDescription />
          </div>
        </div>
      </div>
    </StorageProvider>
  );
};
