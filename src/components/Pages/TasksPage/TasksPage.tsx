import React, { useState } from "react";
import { SideBar } from "../../layout/SideBar";
import { Header } from "../../layout/Header";
import { Tasks } from "../../Tasks";
import { TaskDescription } from "../../TaskDescription";
import { AddNewTask } from "../../AddNewTask/AddNewTask";
import "./TasksPage.scss";

export const TasksPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <div className="TasksPage">
      <div className="TasksPage__sidebar">
        <SideBar />
      </div>

      <div className="TasksPage__header">
        <Header />
      </div>

      <div className="TasksPage__content">
        <div className="TasksPage__content-taskList">
          <Tasks onClickOpen={open} />
        </div>
        <div className="TasksPage__content-task">
          <TaskDescription />
        </div>
      </div>
      {isOpen && <AddNewTask onClickClose={close} />}
    </div>
  );
};
