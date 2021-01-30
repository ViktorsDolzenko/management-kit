import React, { useContext, useEffect } from "react";
import "./tasks.scss";
import { TasksList } from "components/TasksList";
import { Button, BUTTON_CATEGORY } from "../Button";
import { StorageContext, TASKS_STORAGE_KEY } from "../../context/storage";
import { setTaskForView, taskIsChecked } from "../../context/actions";
import { TASK_TYPE, taskItemsType } from "./taskItems";

interface tasksProps {
  onClickOpen: () => void;
}

export const Tasks = ({ onClickOpen }: tasksProps) => {
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

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <div className="tasks">
      <div className="tasks__container">
        <div className="tasks__header">
          <h2 className="tasks__title">Backlog</h2>
          <Button
            category={BUTTON_CATEGORY.primary}
            title="+ Add Task"
            onClickOpen={onClickOpen}
          />
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
          <Button
            category={BUTTON_CATEGORY.primary}
            title="+ Add Task"
            onClickOpen={onClickOpen}
          />
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
