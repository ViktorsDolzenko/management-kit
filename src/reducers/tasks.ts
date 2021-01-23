import { commentType, taskItemsType } from "../components/Tasks/taskItems";

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

export const addNewComments = (
  tasks: taskItemsType[],
  taskId: number,
  newComment: commentType
) => {
  return tasks.map((task) => {
    if (task.id === taskId && task.comments) {
      return [...task.comments, newComment];
    }
    return task.comments;
  });
};
