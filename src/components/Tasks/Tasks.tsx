import React, { useContext } from "react";
import "./tasks.scss";
import { TasksList } from "components/TasksList";
import { Button, BUTTON_TYPE } from "../Button";
import { StorageContext } from "../../context/storage";
import { setTaskForView, taskIsChecked } from "../../context/actions";
import { TASK_TYPE, taskItemsType } from "./taskItems";

export const Tasks = () => {
  const { state, dispatch } = useContext(StorageContext);
  const preparedBackLogTasks = state.tasks.filter(
    (task) => task.type === TASK_TYPE.BACKLOG
  );

  const preparedToDoTasks = state.tasks.filter(
    (task) => task.type === TASK_TYPE.TODO
  );

  const doneTaskHandler = (task: taskItemsType): void => {
    dispatch(taskIsChecked(task.id));
  };

  return (
    <div className="tasks">
      <div className="tasks__container">
        <div className="tasks__header">
          <h2 className="tasks__title">Backlog</h2>
          <Button type={BUTTON_TYPE.primary} title="+ Add Task" />
        </div>
        <TasksList
          items={preparedBackLogTasks}
          onTaskSelect={(taskId) => dispatch(setTaskForView(taskId))}
          onDoneChecked={(task) => doneTaskHandler(task)}
        />
      </div>
      <div className="tasks__container">
        <div className="tasks__header">
          <h2 className="tasks__title">To Do</h2>
          <Button type={BUTTON_TYPE.primary} title="+ Add Task" />
        </div>
        <TasksList
          items={preparedToDoTasks}
          onTaskSelect={(taskId) => dispatch(setTaskForView(taskId))}
          onDoneChecked={(task) => doneTaskHandler(task)}
        />
      </div>
    </div>
  );
};
