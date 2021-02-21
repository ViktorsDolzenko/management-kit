import { Layout } from "components/layout/Layout";
import React, { useContext, useEffect, useState } from "react";

import { Tasks } from "components/Tasks";
import { TaskDescription } from "components/TaskDescription";
import { AddNewTask } from "components/AddNewTask/AddNewTask";
import { TASK_TYPE } from "components/Tasks/taskItems";
import { open } from "utils";
import { close } from "utils";

import "./TasksPage.scss";
import { useMediaQuery } from "react-responsive";
import { getTasks, StorageContext } from "../../../context/storage";
import { updateTasks } from "../../../context/actions";
import { animateScroll as scroll } from "react-scroll/modules";

export const TasksPage = () => {
  const [isOpenAddNewTask, setIsOpenAddNewTask] = useState(false);
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

  const getAllTasks = async () => {
    const tasks = await getTasks();
    dispatch(updateTasks(tasks));
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const isTaskOpened = state.tasks
    ? state.tasks.find((task) => task.isOpened)
    : false;

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <Layout pageTitle="Tasks">
      <div className="Tasks">
        <div className="page-container__header">
          {!isDesktopOrLaptop && (
            <div className="page-container__scrollToTop " onClick={scrollToTop}>
              <i className="fas fa-arrow-up" />
            </div>
          )}
        </div>

        <div className="Tasks__container">
          <div className="Tasks__list">
            <Tasks
              onAddTaskClick={(taskType) => taskCreationHandler(taskType)}
            />
          </div>

          {!isDesktopOrLaptop && isTaskOpened && (
            <div className="page-container__divider" />
          )}
          <div className="Tasks__description">
            <TaskDescription />
          </div>
        </div>

        {isOpenAddNewTask && (
          <AddNewTask
            onClickClose={() => close(setIsOpenAddNewTask)}
            taskType={taskTypeForCreation}
          />
        )}
      </div>
    </Layout>
  );
};
