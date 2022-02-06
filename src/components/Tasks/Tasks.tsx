import React, { useContext, useEffect, useState } from "react";

import { TasksList } from "components/TasksList";
import { Button, BUTTON_STYLE } from "components/Button";
import { StorageContext } from "context/storage";
import { setTaskForView } from "context/actions";
import { TASK_TYPE } from "./taskItems";

import "./tasks.scss";
import { auth } from "Service/firebase";
import { doneTaskHandler } from "../../utils";
import { useTranslation } from "react-i18next";

interface tasksProps {
  onAddTaskClick: (taskType: TASK_TYPE) => void;
  currentUserTasks: boolean;
}

export const Tasks = ({ onAddTaskClick, currentUserTasks }: tasksProps) => {
    const [currentUser, setCurrentUser] = useState<any>(null);

    // translation hook
    const { t } = useTranslation();

    // set current user on mount
    useEffect(() => {
        auth.onAuthStateChanged(setCurrentUser);
    }, []);

    const { state, dispatch } = useContext(StorageContext);

    // filter tasks to get backlog tasks
    const preparedBackLogTasks = state.tasks.filter(
        (task) => task.type === TASK_TYPE.BACKLOG
    );

    // filter tasks to get TO-DO tasks
    const preparedToDoTasks = state.tasks.filter(
        (task) => task.type === TASK_TYPE.TODO
    );

    // get current user to-do tasks
    const currentUserTodoTasks = preparedToDoTasks.filter((item) => {
        return currentUser?.displayName === item.assign;
    });

    // get current user backlog tasks
    const currentUserBackLogTasks = preparedBackLogTasks.filter((item) => {
        return currentUser?.displayName === item.assign;
    });

    return (
        <div className="tasks">
            <div className="tasks__container">
                <div className="tasks__header">
                    <h2 className="tasks__title">Backlog</h2>
                    {currentUser?.emailVerified && (
                        <Button
                            category={BUTTON_STYLE.Primary}
                            title="addTask"
                            onClick={() => onAddTaskClick(TASK_TYPE.BACKLOG)}
                        />
                    )}
                </div>
                {preparedBackLogTasks.length !== 0 || currentUserBackLogTasks.length !== 0 ? (
                    <TasksList
                        items={currentUserTasks ? currentUserBackLogTasks : preparedBackLogTasks}
                        onTaskSelect={(taskId) => dispatch(setTaskForView(taskId))}
                        onDoneChecked={(taskId, isChecked) =>
                            doneTaskHandler(taskId, isChecked, dispatch)
                        }
                    />
                ) : (
                    <div className="tasks__empty">
                        <span>0 {t("phrases.tasksInBacklog")}</span>
                    </div>
                )}
            </div>
            <div className="tasks__container">
                <div className="tasks__header">
                    <h2 className="tasks__title"> {t("phrases.todo")}</h2>
                    {currentUser?.emailVerified && (
                        <Button
                            category={BUTTON_STYLE.Primary}
                            title="addTask"
                            onClick={() => onAddTaskClick(TASK_TYPE.TODO)}
                        />
                    )}
                </div>
                {preparedToDoTasks.length !== 0 || currentUserTodoTasks.length !== 0 ? (
                    <TasksList
                        items={currentUserTasks ? currentUserTodoTasks : preparedToDoTasks}
                        onTaskSelect={(taskId) => dispatch(setTaskForView(taskId))}
                        onDoneChecked={(task, isChecked) =>
                            doneTaskHandler(task, isChecked, dispatch)
                        }
                    />
                ) : (
                    <div className="tasks__empty">
                        <span>0 {t("phrases.tasksInToDo")}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
