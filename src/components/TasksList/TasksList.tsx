import React from "react";
import "./taskList.scss";
import { taskItemsType } from "components/Tasks/taskItems";
import { CheckBox } from "components/CheckBox";
import { Tag } from "components/Tag";

interface tasksListItemsType {
  items: taskItemsType[];
  onTaskSelect: (task: taskItemsType) => void;
}

export const TasksList = ({ items, onTaskSelect }: tasksListItemsType) => {
  return (
    <div>
      {items.map((item) => {
        const taskId = item.id.toString();
        return (
          <div
            className="taskList"
            key={item.id}
            onClick={() => onTaskSelect(item)}
          >
            <div className="taskList__container">
              <CheckBox id={taskId} />
              <span className="taskList__text">{item.title}</span>
              <div className="taskList__tag">
                <img
                  src={item.image}
                  alt={item.image}
                  className="taskList__tag_img"
                />
                <Tag type={item.tagType} title={item.tag} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
