import React, { useContext, useEffect, useState } from "react";

import { TasksList } from "components/TasksList";
import { Button, BUTTON_STYLE } from "components/Button";
import { StorageContext } from "context/storage";
import { setTaskForView, taskIsChecked } from "context/actions";
import { TASK_TYPE, taskItemsType } from "./taskItems";

import "./tasks.scss";
import { auth } from "../../firebase";

interface tasksProps {
  onAddTaskClick: (taskType: TASK_TYPE) => void;
}

export const Tasks = ({ onAddTaskClick }: tasksProps) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

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
          {currentUser?.emailVerified && (
            <Button
              category={BUTTON_STYLE.primary}
              title="+ Add Task"
              onClick={() => onAddTaskClick(TASK_TYPE.BACKLOG)}
            />
          )}
        </div>
        {preparedBackLogTasks.length !== 0 ? (
          <TasksList
            items={preparedBackLogTasks}
            onTaskSelect={(taskId) => dispatch(setTaskForView(taskId))}
            onDoneChecked={(task) => doneTaskHandler(task)}
          />
        ) : (
          <div className="tasks__empty">
            <span>0 tasks in Backlog</span>
          </div>
        )}
      </div>
      <div className="tasks__container">
        <div className="tasks__header">
          <h2 className="tasks__title">To Do</h2>
          {currentUser?.emailVerified && (
            <Button
              category={BUTTON_STYLE.primary}
              title="+ Add Task"
              onClick={() => onAddTaskClick(TASK_TYPE.TODO)}
            />
          )}
        </div>
        {preparedToDoTasks.length !== 0 ? (
          <TasksList
            items={preparedToDoTasks}
            onTaskSelect={(taskId) => dispatch(setTaskForView(taskId))}
            onDoneChecked={(task) => doneTaskHandler(task)}
          />
        ) : (
          <div className="tasks__empty">
            <span>0 tasks in To Do</span>
          </div>
        )}
      </div>
    </div>
  );
};
