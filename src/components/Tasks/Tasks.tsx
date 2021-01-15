import React from "react";
import "./tasks.scss";
import { TasksList } from "components/TasksList";
import { backLog, toDo } from "./taskItems";
import { Button, BUTTON_TYPE } from "../Button";

export const Tasks = () => {
  return (
    <div className="tasks">
      <div className="tasks__container">
        <div className="tasks__header">
          <h2 className="tasks__title">Backlog</h2>
          <Button type={BUTTON_TYPE.primary} title="+ Add Task" />
        </div>
        <TasksList items={backLog} />
      </div>
      <div className="tasks__container">
        <div className="tasks__header">
          <h2 className="tasks__title">To Do</h2>
          <Button type={BUTTON_TYPE.primary} title="+ Add Task" />
        </div>
        <TasksList items={toDo} />
      </div>
    </div>
  );
};
