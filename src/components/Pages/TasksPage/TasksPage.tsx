import React, { useContext, useEffect, useState } from "react";

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
import { useMediaQuery } from "react-responsive";
import { getTasks, StorageContext } from "../../../context/storage";
import { updateTasks } from "../../../context/actions";

export const TasksPage = () => {
  const [isOpenAddNewTask, setIsOpenAddNewTask] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [taskTypeForCreation, setTaskTypeForCreation] = useState<TASK_TYPE>(
    TASK_TYPE.BACKLOG
  );

  const { state, dispatch } = useContext(StorageContext);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

  const taskCreationHandler = (taskType: TASK_TYPE) => {
    setTaskTypeForCreation(taskType);
    open(setIsOpenAddNewTask);
  };

  const openSignUp = () => {
    close(setIsOpenLogin);
    open(setIsOpenSignUp);
  };

  const getAllTasks = async () => {
    const tasks = await getTasks();
    dispatch(updateTasks([...state.tasks, ...tasks]));
  };

  useEffect(() => {
    getAllTasks().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        {!isDesktopOrLaptop && <div className="page-container__divider" />}
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
