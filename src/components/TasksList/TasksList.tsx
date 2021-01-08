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
          <div className="task" key={item.id}>
            <div className="task__container">
              <div className="task__checkbox">
                <input
                  className="task__checkbox--styled"
                  id={taskId}
                  type="checkbox"
                  defaultChecked={item.checkbox}
                />
                <label htmlFor={taskId} />
              </div>
              <span className="task__text">{item.task}</span>
              <div className="task__tag">
                <img src={item.image} alt={item.image} />
                <span className="task__tag--text">{item.tag}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
