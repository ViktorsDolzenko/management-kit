import React, { useContext } from "react";
import "./tasks.scss";
import { TasksList } from "components/TasksList";
import { backLog, toDo } from "./taskItems";
import { Button, BUTTON_TYPE } from "../Button";

import { SET_TASK_FOR_VIEW, StorageContext } from "contex/storage";

export const Tasks = () => {
  const { state, dispatch } = useContext(StorageContext);

  return (
    <div className="tasks">
      <div className="tasks__container">
        <div className="tasks__header">
          <h2 className="tasks__title">Backlog</h2>
          <Button type={BUTTON_TYPE.primary} title="+ Add Task" />
        </div>
        <TasksList
          items={backLog}
          onTaskSelect={(task) =>
            dispatch({ type: SET_TASK_FOR_VIEW, payload: task })
          }
        />
      </div>
      <div className="tasks__container">
        <div className="tasks__header">
          <h2 className="tasks__title">To Do</h2>
          <Button type={BUTTON_TYPE.primary} title="+ Add Task" />
        </div>
        <TasksList
          items={toDo}
          onTaskSelect={(task) =>
            dispatch({ type: SET_TASK_FOR_VIEW, payload: task })
          }
        />
      </div>
    </div>
  );
};
