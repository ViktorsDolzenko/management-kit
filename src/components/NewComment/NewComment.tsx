import React, { useContext, useEffect, useState } from "react";
import "./newComment.scss";
import { useForm } from "react-hook-form";
import { commentType } from "components/Tasks/taskItems";
import { getNewId } from "utils";
import moment from "moment";
import { updateTasks } from "../../context/actions";
import { getTasks, StorageContext } from "../../context/storage";
import { auth, db, fieldValue } from "Service/firebase";
import { Button, BUTTON_STYLE } from "../Button";
import { sentIcon } from "../../const";
import { BUTTON_TYPE } from "../Button/buttonProps";

interface newCommentProps {
  addComment: (comment: commentType, taskId: number) => void;
  taskId: number;
  comments: commentType[];
  username: string;
}

export const NewComment = ({ taskId, comments, username }: newCommentProps) => {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const { register, handleSubmit, reset } = useForm();
    const { dispatch } = useContext(StorageContext);

    useEffect(() => {
        auth.onAuthStateChanged(setCurrentUser);
    });

    const onSubmit = async (data: any) => {
        await db
            .collection("tasks-collection")
            .doc("tasks")
            .set(
                {
                    [taskId]: {
                        comments: fieldValue.arrayUnion({
                            id: getNewId(comments),
                            author: username,
                            createDate: moment().format(" MMMM Do [at] HH:mm"),
                            text: data.text,
                            vacancy: "Developer",
                            photo: currentUser.photoURL
                        })
                    }
                },
                { merge: true }
            );

        reset();
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
        <div className="new-comment">
            <img
                src={currentUser?.photoURL}
                alt="profile-avatar"
                className="new-comment__avatar"
            />
            <form className="new-comment__form" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    className="new-comment__input"
                    placeholder="Add a comment…"
                    ref={register}
                    required
                    name="text"
                />
                <Button
                    category={BUTTON_STYLE.Significant}
                    titleIcon={sentIcon}
                    type={BUTTON_TYPE.Submit}
                    title={''}
                />
            </form>
        </div>
    );
};
