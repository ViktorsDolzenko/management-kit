import React, { useContext } from "react";
import "./addNewTask.scss";
import { Button, BUTTON_CATEGORY } from "../Button";
import { useForm } from "react-hook-form";
import { BUTTON_TYPE } from "../Button/buttonProps";
import { StorageContext } from "../../context/storage";
import { addNewTask } from "../../context/actions";
import { getTaskNewId } from "../../utils";
import photo_1 from "components/Tasks/images/photo-1.png";
import moment from "moment";
import { TASK_TYPE } from "../Tasks/taskItems";
import { TAG_TYPE } from "../Tag/tagProps";

interface AddNewTaskProps {
  onClickClose: () => void;
  taskType: TASK_TYPE;
}
export const AddNewTask = ({ onClickClose, taskType }: AddNewTaskProps) => {
  const { register, handleSubmit } = useForm();
  const { state, dispatch } = useContext(StorageContext);

  const onSubmit = (data: any) => {
    dispatch(
      addNewTask({
        done: false,
        image: photo_1,
        title: data.title,
        id: getTaskNewId(state.tasks),
        tag: "Development",
        tagType: TAG_TYPE.primary,
        date: moment().format(" MMMM Do"),
        assign: "Random Random",
        description: data.description,
        type: taskType,
        comments: [],
        files: [],
      })
    );
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
          <Button
            category={BUTTON_CATEGORY.basic}
            title="Add Task"
            type={BUTTON_TYPE.submit}
          />
        </form>
      </div>
    </div>
  );
};
