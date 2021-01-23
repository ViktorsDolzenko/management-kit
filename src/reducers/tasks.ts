import { taskItemsType } from "../components/Tasks/taskItems";

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
