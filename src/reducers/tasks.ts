import { taskItemsType } from "components/Tasks/taskItems";
import { taskExtend } from "context/storage";

export const toggleTaskCompleteById = (
  allTasks: taskItemsType[],
  taskId: number
): taskItemsType[] => {
  return allTasks.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        done: !task.done,
      };
    }
    return task;
  });
};

export const openTask = (allTasks: taskExtend[], taskId: number) => {
  return allTasks.map((task) => {
    return {
      ...task,
      isOpened: taskId === task.id,
    };
  });
};

export const addNewTask = (
  allTasks: taskItemsType[],
  newTask: taskItemsType
) => {
  return [...allTasks, newTask];
};

export const deleteTask = (allTasks: taskExtend[], taskId: number) => {
  return allTasks.filter((task) => task.id !== taskId);
};
