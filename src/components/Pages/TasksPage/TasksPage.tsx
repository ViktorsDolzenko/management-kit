import { TASK_TYPE } from "components/Tasks/taskItems";
import React, { useState } from "react";
import { AddNewTask } from "../../AddNewTask/AddNewTask";
import { Header } from "../../layout/Header";
import { SideBar } from "../../layout/SideBar";
import { TaskDescription } from "../../TaskDescription";
import { Tasks } from "../../Tasks";
import "./TasksPage.scss";

export const TasksPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskTypeForCreation, setTaskTypeForCreation] = useState<TASK_TYPE>(
    TASK_TYPE.BACKLOG
  );

  const taskCreationHandler = (taskType: TASK_TYPE) => {
    setTaskTypeForCreation(taskType);
    open();
  };

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
          <Tasks
            onAddTaskClick={(taskTypeForCreation) =>
              taskCreationHandler(taskTypeForCreation)
            }
          />
        </div>
        <div className="TasksPage__content-task">
          <TaskDescription />
        </div>
      </div>
      {isOpen && (
        <AddNewTask onClickClose={close} taskType={taskTypeForCreation} />
      )}
    </div>
  );
};
