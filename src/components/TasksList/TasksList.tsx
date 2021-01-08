import React from "react";
import "./taskList.scss";
import { taskItemsType } from "../Tasks/taskItems";

interface tasksListItemsType {
  items: taskItemsType[];
}

export const TasksList = ({ items }: tasksListItemsType) => {
  return (
    <div>
      {items.map((item) => {
        const taskId = item.id.toString();
        return (
          <div className="taskList" key={item.id}>
            <div className="taskList__container">
              <div className="taskList__checkbox">
                <input
                  className="taskList__checkbox--input"
                  id={taskId}
                  type="checkbox"
                  defaultChecked={item.done}
                />
                <label htmlFor={taskId} />
              </div>
              <span className="taskList__text">{item.title}</span>
              <div className="taskList__tag">
                <img src={item.image} alt={item.image} />
                <span className="taskList__tag--text">{item.tag}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
