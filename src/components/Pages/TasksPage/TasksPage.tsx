import React, { useState } from "react";

import { SideBar } from "components/layout/SideBar";
import { Header } from "components//layout/Header";
import { Tasks } from "components/Tasks";
import { TaskDescription } from "components/TaskDescription";
import { AddNewTask } from "components/AddNewTask/AddNewTask";
import { TASK_TYPE } from "components/Tasks/taskItems";
import { Login } from "../../Login";
import { open } from "utils";
import { close } from "utils";

import "./TasksPage.scss";
import { SignUp } from "../../SignUp";

export const TasksPage = () => {
  const [isOpenAddNewTask, setIsOpenAddNewTask] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [taskTypeForCreation, setTaskTypeForCreation] = useState<TASK_TYPE>(
    TASK_TYPE.BACKLOG
  );

  const taskCreationHandler = (taskType: TASK_TYPE) => {
    setTaskTypeForCreation(taskType);
    open(setIsOpenAddNewTask);
  };

  const openSignUp = () => {
    close(setIsOpenLogin);
    open(setIsOpenSignUp);
  };

  return (
    <div className="page-container">
      <div className="page-container__header">
        <Header
          onMenuClick={() => setIsOpenMenu(!isOpenMenu)}
          isOpenMenu={isOpenMenu}
        />
      </div>

      <div className="page-container__sidebar">
        <SideBar
          onLoginClick={() => open(setIsOpenLogin)}
          isOpenMenu={isOpenMenu}
        />
      </div>
      <div className="page-container__content">
        <div className="page-container__content-taskList">
          <Tasks onAddTaskClick={(taskType) => taskCreationHandler(taskType)} />
        </div>
        <div className="page-container__content-task">
          <TaskDescription />
        </div>
      </div>
      {isOpenAddNewTask && (
        <AddNewTask
          onClickClose={() => close(setIsOpenAddNewTask)}
          taskType={taskTypeForCreation}
        />
      )}
      {isOpenLogin && (
        <Login
          onClickClose={() => close(setIsOpenLogin)}
          onSignUpClick={openSignUp}
        />
      )}
      {isOpenSignUp && <SignUp onClickClose={() => close(setIsOpenSignUp)} />}
    </div>
  );
};
