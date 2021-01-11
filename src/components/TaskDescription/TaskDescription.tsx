import React from "react";
import { Followers } from "../Followers/Followers";
import "./taskDescription.scss";
import { CheckBox } from "../CheckBox/CheckBox";
import { backLog } from "../Tasks/taskItems";

const data = backLog[1];

export const TaskDescription = () => {
  return (
    <div className="task-description">
      <div className="task-description__container">
        <div className="task-description__header">
          <div>
            <h2 className="task-description__header--title">{data.title}</h2>
            <span>Added by Kristin A. yesterday at 12:41pm</span>
          </div>
          <div className="task-description__header--misc misc">
            <CheckBox id="description" />
            <button>Button</button>
          </div>
        </div>
        <div className="task-description__info">
          <div className="task-description__data">
            <span className="task-description__data--title">Assign to</span>
            <div className="task-description__assign">
              <img
                src={data.image}
                alt="img"
                className="task-description__assign--img"
              />
              <span>{data.assign}</span>
            </div>
          </div>
          <div className="task-description__data">
            <span className="task-description__data--title">Due on</span>
            <span>{data.date}</span>
          </div>
          <div className="task-description__data">
            <span className="task-description__data--title">Tag</span>
            <span className="task-description__tag">{data.tag}</span>
          </div>
          <div className="task-description__data">
            <span className="task-description__data--title">Followers</span>
            <Followers />
          </div>
        </div>
        <hr className="task-description__divider" />
        <div className="task-description__description">
          <h4 className="task-description__description--title">Description</h4>
          <p className="task-description__description--text">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};
