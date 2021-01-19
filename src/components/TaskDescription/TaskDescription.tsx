import React, { useContext } from "react";
import { Followers } from "components/Followers";
import "./taskDescription.scss";
import { CheckBox } from "components/CheckBox";
import { Button, BUTTON_TYPE } from "components/Button";
import { simpleIcon } from "../../const";
import { Tag } from "components/Tag";
import { File, FILE_TYPE } from "../File/File";
import { NewComment } from "../NewComment/NewComment";
import { Comment } from "../Comment/Comment";

import fileMock from "./images/Base.png";
import { StorageContext } from "../../context/storage";
import { taskIsChecked } from "../../context/actions";

export const TaskDescription = () => {
  const { state, dispatch } = useContext(StorageContext);

  return (
    <>
      {state.taskForView ? (
        <div className="task-description">
          <div className="task-description__container">
            <div className="task-description__header">
              <div>
                <h2 className="task-description__header_title">
                  {state.taskForView?.title}
                </h2>
                <span>Added by Kristin A. yesterday at 12:41pm</span>
              </div>
              <div className="task-description__header_misc misc">
                <CheckBox
                  id="description"
                  isChecked={state.taskForView?.done}
                  onChange={() => {
                    if (state.taskForView?.id) {
                      dispatch(taskIsChecked(state.taskForView?.id));
                    }
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
                    src={state.taskForView?.image}
                    alt="img"
                    className="task-description__assign_img"
                  />
                  <span>{state.taskForView?.assign}</span>
                </div>
              </div>
              <div className="task-description__data">
                <span className="task-description__data_title">Due on</span>
                <span>{state.taskForView?.date}</span>
              </div>
              <div className="task-description__data">
                <span className="task-description__data_title">Tag</span>
                <Tag
                  type={state.taskForView?.tagType}
                  title={state.taskForView?.tag}
                />
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
                {state.taskForView?.description}
              </p>
            </div>
            <div className="task-description__file">
              <File
                fileType={FILE_TYPE.PDF}
                fileName={"Redesign Brief 2019.pdf"}
                fileSize={"159 KB"}
              />
              <File
                image={fileMock}
                fileName={"Header.png"}
                fileSize={"129 KB"}
              />
            </div>
            <hr className="task-description__divider" />
            <div className="task-description__discussion">
              <h4 className="task-description__discussion_title">Discussion</h4>
              <NewComment />
              {state.taskForView?.comments && (
                <Comment comments={state.taskForView?.comments} />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
