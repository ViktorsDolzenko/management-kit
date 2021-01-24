import React, { useContext } from "react";
import { Followers } from "components/Followers";
import "./taskDescription.scss";
import { CheckBox } from "components/CheckBox";
import { Button, BUTTON_TYPE } from "components/Button";
import { simpleIcon } from "../../const";
import { Tag } from "components/Tag";
import { File } from "../File/File";
import { NewComment } from "../NewComment/NewComment";
import { Comment } from "../Comment/Comment";
import { StorageContext } from "../../context/storage";
import { addComment, deleteFile, taskIsChecked } from "../../context/actions";
import { commentType, taskItemsType } from "../Tasks/taskItems";

export const TaskDescription = () => {
  const { state, dispatch } = useContext(StorageContext);

  const doneTaskHandler = (task: taskItemsType): void => {
    dispatch(taskIsChecked(task.id));
  };
  const taskForView = state.tasks.find((task) => task.isOpened);

  return (
    <>
      {taskForView && (
        <div className="task-description">
          <div className="task-description__container">
            <div className="task-description__header">
              <div>
                <h2 className="task-description__header_title">
                  {taskForView?.title}
                </h2>
                <span>Added by Kristin A. yesterday at 12:41pm</span>
              </div>
              <div className="task-description__header_misc misc">
                <CheckBox
                  id="description"
                  isChecked={taskForView?.done}
                  onChange={() => {
                    taskForView && doneTaskHandler(taskForView);
                  }}
                />
                <Button type={BUTTON_TYPE.simple} titleIcon={simpleIcon} />
              </div>
            </div>
            <div className="task-description__info">
              <div className="task-description__data">
                <span className="task-description__data_title">Assign to</span>
                <div className="task-description__assign">
                  <img
                    src={taskForView?.image}
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
                <Tag type={taskForView?.tagType} title={taskForView?.tag} />
              </div>
              <div className="task-description__data">
                <span className="task-description__data_title">Followers</span>
                <Followers />
              </div>
            </div>
            <hr className="task-description__divider" />
            <div className="task-description__description">
              <h4 className="task-description__description_title">
                Description
              </h4>
              <p className="task-description__description_text">
                {taskForView?.description}
              </p>
            </div>
            <div className="task-description__file">
              {taskForView.files && (
                <File
                  files={taskForView.files}
                  onDelete={(fileId, taskId) =>
                    dispatch(deleteFile(fileId, taskId))
                  }
                  taskId={taskForView.id}
                />
              )}
            </div>
            <hr className="task-description__divider" />
            <div className="task-description__discussion">
              <h4 className="task-description__discussion_title">Discussion</h4>
              {taskForView?.comments && (
                <NewComment
                  addComment={(comment: commentType, taskId: number) =>
                    dispatch(addComment(comment, taskId))
                  }
                  taskId={taskForView.id}
                  comments={taskForView.comments}
                />
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
