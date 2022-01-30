import React, { useContext, useEffect, useState } from "react";

import { CheckBox } from "components/CheckBox";
import { Button, BUTTON_STYLE } from "components/Button";
import { simpleIcon } from "const";
import { Tag } from "components/Tag";
import { Files } from "components/Files";
import { NewComment } from "components/NewComment";
import { Comment } from "components/Comment";
import { getTasks, StorageContext } from "context/storage";
import { addComment, updateTasks } from "context/actions";
import { commentType } from "components/Tasks/taskItems";

import "./taskDescription.scss";
import { auth, db } from "Service/firebase";
import moment from "moment";
import { deleteTaskFromServer } from "../../reducers/tasks";
import { doneTaskHandler, tagType } from "../../utils";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useTranslation } from "react-i18next";

export const TaskDescription = () => {
    const [currentUser, setCurrentUser] = useState<any>(null);

    const getUser = db.collection("users");
    // @ts-ignore
    const [values] = useCollectionData(getUser, { idField: "id" });

    const getAvatar = (userName: string) => {
        const foundedUser = values?.find((item) => item.userName === userName);
        return foundedUser?.avatarUrl ? `${foundedUser?.avatarUrl}?alt=media` : 'https://via.placeholder.com/50';
    };

    useEffect(() => {
        auth.onAuthStateChanged(setCurrentUser);
    }, []);

    const { state, dispatch } = useContext(StorageContext);

    const taskForView = state.tasks.find((task) => task.isOpened);

    const deleteTask = async (taskId: number) => {
        await deleteTaskFromServer(taskId);
        const newTasks = await getTasks();
        dispatch(updateTasks(newTasks));
    };

    const { t } = useTranslation();

    return (
        <>
            {taskForView && (
                <div className="task-description">
                    <div className="task-description__container">
                        <div className="task-description__header">
                            <div>
                                <h2
                                    className="task-description__header_title"
                                    id="taskDescriptionTitle"
                                >
                                    {taskForView?.title}
                                </h2>
                                <span>
                                    {t("phrases.addedBy")} {taskForView?.addedBy} {t("phrases.at")}
                                    {moment().format(" MMMM Do HH:MM")}
                                </span>
                            </div>
                            <div className="task-description__header_misc">
                                <CheckBox
                                    id="description"
                                    isChecked={taskForView?.done}
                                    onChange={() => {
                                        // eslint-disable-next-line no-unused-expressions
                                        taskForView && (
                                            doneTaskHandler(
                                                taskForView?.id,
                                                taskForView?.done,
                                                dispatch
                                            ));
                                    }}
                                />
                                {currentUser?.emailVerified && (
                                    <div className="task-description__showMore">
                                        <Button
                                            category={BUTTON_STYLE.Simple}
                                            titleIcon={simpleIcon}
                                            title={''}
                                        />
                                        <div className="task-description__showMore_hidden">
                                            <Button
                                                category={BUTTON_STYLE.Critical}
                                                title="deleteTask"
                                                onClick={() => deleteTask(taskForView?.id)}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="task-description__info">
                            <div className="task-description__data">
                                <span className="task-description__data_title">{t("phrases.assignTo")}</span>
                                <div className="task-description__assign">
                                    <img
                                        //@ts-ignore
                                        src={getAvatar(taskForView?.assign)}
                                        alt="img"
                                        className="task-description__assign_img"
                                    />
                                    <span>{taskForView?.assign}</span>
                                </div>
                            </div>
                            <div className="task-description__data">
                                <span className="task-description__data_title">Due on</span>
                                <span>{taskForView?.date}</span>
                            </div>
                            <div className="task-description__data">
                                <span className="task-description__data_title">Tag</span>
                                <Tag
                                    type={tagType(taskForView?.tag)}
                                    title={taskForView?.tag}
                                />
                            </div>
                        </div>
                        <hr className="task-description__divider" />
                        <div className="task-description__description">
                            <h4 className="task-description__description_title">
                                {t("phrases.description")}
                            </h4>
                            <p className="task-description__description_text">
                                {taskForView?.description}
                            </p>
                        </div>
                        <div className="task-description__file">
                            {taskForView.files && (
                                <Files files={taskForView?.files} taskId={taskForView.id} />
                            )}
                        </div>
                        <hr className="task-description__divider" />
                        <div className="task-description__discussion">
                            <div className="task-description__discussion_title">
                                <h4 className="task-description__discussion_title-text">
                                    {t("phrases.discussion")}
                                </h4>
                                <span className="task-description__discussion_count">
                                    {t("phrases.comments")}: {taskForView?.comments?.length}
                                </span>
                            </div>
                            {taskForView?.comments && currentUser?.emailVerified && (
                                <NewComment
                                    addComment={(comment: commentType, taskId: number) =>
                                        dispatch(addComment(comment, taskId))
                                    }
                                    taskId={taskForView.id}
                                    comments={taskForView.comments}
                                    username={currentUser.displayName}
                                />
                            )}
                            {!currentUser?.emailVerified && (
                                <p className="task-description__discussion_noUser">
                                    {t("phrases.signInOrVerifyToLeaveComments")}
                                </p>
                            )}
                            {taskForView?.comments && (
                                <Comment comments={taskForView?.comments} />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
