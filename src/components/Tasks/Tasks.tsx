import React from "react";
import "./tasks.scss";
import { TasksList } from "../TasksList";
import { backLog, toDo } from "./taskItems";

export const Tasks = () => {
  return (
    <div className="tasks">
      <div className="tasks__container">
        <div className="tasks__header">
          <h2 className="tasks__title">Backlog</h2>
          <button className="tasks__button button">+ Add Task</button>
        </div>
        <TasksList items={backLog} />
      </div>
      <div className="tasks__container">
        <div className="tasks__header">
          <h2 className="tasks__title">To Do</h2>
          <button className="tasks__button button">+ Add Task</button>
        </div>
        <TasksList items={toDo} />
      </div>
    </div>
  );
};
