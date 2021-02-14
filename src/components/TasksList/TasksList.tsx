import React from "react";

import { taskItemsType } from "components/Tasks/taskItems";
import { CheckBox } from "components/CheckBox";
import { Tag } from "components/Tag";

import "./taskList.scss";

interface tasksListItemsType {
  items: taskItemsType[];
  onTaskSelect: (taskId: number) => void;
  onDoneChecked: (task: taskItemsType) => void;
}

export const TasksList = ({
  items,
  onTaskSelect,
  onDoneChecked,
}: tasksListItemsType) => {
  return (
    <>
      {items.map((item) => {
        const taskId = item.id.toString();
        return (
          <div className="taskList" key={item.id}>
            <div className="taskList__container">
              <CheckBox
                id={taskId}
                isChecked={item.done}
                onChange={() => onDoneChecked(item)}
              />
              <div onClick={() => onTaskSelect(item.id)}>
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
          </div>
        );
      })}
    </>
  );
};
