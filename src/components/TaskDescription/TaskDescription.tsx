import React from "react";
import { Followers } from "components/Followers";
import "./taskDescription.scss";
import { CheckBox } from "components/CheckBox";
import { backLog } from "components/Tasks/taskItems";
import { Button, BUTTON_TYPE } from "components/Button";
import { simpleIcon } from "../../const";
import { Tag } from "components/Tag";
import { File, FILE_TYPE } from "../File/File";
import { NewComment } from "../NewComment/NewComment";
import { Comments } from "../Comment/Comment";

import fileMock from "./images/Base.png";

const data = backLog[1];

export const TaskDescription = () => {
  return (
    <div className="task-description">
      <div className="task-description__container">
        <div className="task-description__header">
          <div>
            <h2 className="task-description__header_title">{data.title}</h2>
            <span>Added by Kristin A. yesterday at 12:41pm</span>
          </div>
          <div className="task-description__header_misc misc">
            <CheckBox id="description" />
            <Button type={BUTTON_TYPE.simple} titleIcon={simpleIcon} />
          </div>
        </div>
        <div className="task-description__info">
          <div className="task-description__data">
            <span className="task-description__data_title">Assign to</span>
            <div className="task-description__assign">
              <img
                src={data.image}
                alt="img"
                className="task-description__assign_img"
              />
              <span>{data.assign}</span>
            </div>
          </div>
          <div className="task-description__data">
            <span className="task-description__data_title">Due on</span>
            <span>{data.date}</span>
          </div>
          <div className="task-description__data">
            <span className="task-description__data_title">Tag</span>
            <Tag type={data.tagType} title={data.tag} />
          </div>
          <div className="task-description__data">
            <span className="task-description__data_title">Followers</span>
            <Followers />
          </div>
        </div>
        <hr className="task-description__divider" />
        <div className="task-description__description">
          <h4 className="task-description__description_title">Description</h4>
          <p className="task-description__description_text">
            {data.description}
          </p>
        </div>
        <div className="task-description__file">
          <File
            fileName="Redesign Brief 2019.pdf"
            fileSize="159 KB"
            fileType={FILE_TYPE.PFD}
            onDelete={() => {}}
          />
          <File
            image={fileMock}
            fileName="Header.png"
            onDelete={() => {}}
            fileSize="129 KB"
          />
        </div>
        <hr className="task-description__divider" />
        <div className="task-description__discussion">
          <h4 className="task-description__discussion_title">Discussion</h4>
          <NewComment />
          {data?.comments && <Comments comments={data.comments} />}
        </div>
      </div>
    </div>
  );
};
