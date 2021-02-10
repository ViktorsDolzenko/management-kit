import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";

import { Button, BUTTON_STYLE } from "components/Button";
import photo_1 from "components/Tasks/images/photo-1.png";
import { TASK_TYPE } from "components/Tasks/taskItems";
import { TAG_TYPE } from "components/Tag/tagProps";
import { BUTTON_TYPE } from "components/Button/buttonProps";
import { getTasks, StorageContext } from "context/storage";
import { addNewTask, updateTasks } from "context/actions";
import { getTaskNewId } from "utils";

import "./addNewTask.scss";
import { auth, db } from "../../firebase";

interface AddNewTaskProps {
  onClickClose: () => void;
  taskType: TASK_TYPE;
}

export const AddNewTask = ({ onClickClose, taskType }: AddNewTaskProps) => {
  const { register, handleSubmit } = useForm();
  const { state, dispatch } = useContext(StorageContext);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, [currentUser]);

  const onSubmit = async (data: any) => {
    const key = getTaskNewId(state.tasks);
    await db
      .collection("tasks-collection")
      .doc("tasks")
      .update({
        [key]: {
          done: false,
          image: photo_1,
          title: data.title,
          id: getTaskNewId(state.tasks),
          tag: "Development",
          tagType: TAG_TYPE.primary,
          date: moment().format(" MMMM Do"),
          assign: data.assignTo,
          description: data.description,
          type: taskType,
          comments: [],
          files: [],
        },
      });
    const tasks = await getTasks();
    dispatch(updateTasks(tasks));
    onClickClose();
  };
  return (
    <div className="addNewTask">
      <div className="addNewTask__wrapper">
        <div className="addNewTask__header">
          <h2>Add a New Task</h2>
          <button className="addNewTask__header_exit" onClick={onClickClose} />
        </div>
        <hr className="addNewTask__divider" />
        <form className="addNewTask__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="addNewTask__input-wrapper">
            <label className="addNewTask__label">Title</label>
            <input
              className="addNewTask__input"
              type="text"
              ref={register}
              required={true}
              name="title"
            />
          </div>
          <div className="addNewTask__input-wrapper">
            <label className="addNewTask__label">Description</label>
            <input
              className="addNewTask__input"
              type="text"
              ref={register}
              required={true}
              name="description"
            />
          </div>
          <div className="addNewTask__input-wrapper">
            <label className="addNewTask__label">Assign To</label>
            <input
              className="addNewTask__input"
              type="text"
              ref={register}
              required={true}
              name="assignTo"
            />
          </div>
          <Button
            category={BUTTON_STYLE.basic}
            title="Add Task"
            type={BUTTON_TYPE.submit}
          />
        </form>
      </div>
    </div>
  );
};
