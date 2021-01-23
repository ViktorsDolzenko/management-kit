import { commentType, taskItemsType } from "../components/Tasks/taskItems";

export const addNewComments = (
  tasks: taskItemsType[],
  taskId: number,
  newComment: commentType
) => {
  return tasks.map((task) => {
    if (task.id === taskId) {
      const newComments = task.comments?.unshift(newComment);
      return { ...task, comments: newComments };
    }
    return task;
  });
};
