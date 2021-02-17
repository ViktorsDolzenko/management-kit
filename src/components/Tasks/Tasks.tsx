import React, { useContext, useEffect, useState } from "react";

import { TasksList } from "components/TasksList";
import { Button, BUTTON_STYLE } from "components/Button";
import { getTasks, StorageContext } from "context/storage";
import { setTaskForView, updateTasks } from "context/actions";
import { TASK_TYPE } from "./taskItems";

import "./tasks.scss";
import { auth } from "../../firebase";
import { toggleTaskCompleteById } from "../../reducers/tasks";

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

  const doneTaskHandler = async (taskId: number, isChecked: boolean) => {
    await toggleTaskCompleteById(taskId, isChecked);
    const tasks = await getTasks();
    const preparedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isOpened: true };
      }
      return task;
    });
    dispatch(updateTasks(preparedTasks));
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
            onDoneChecked={(taskId, isChecked) =>
              doneTaskHandler(taskId, isChecked)
            }
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
            onDoneChecked={(task, isChecked) =>
              doneTaskHandler(task, isChecked)
            }
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
