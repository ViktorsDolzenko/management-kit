import { taskExtend } from "../context/storage";

export const removeFile = (
  fileId: number,
  allTasks: taskExtend[],
  taskId: number
) => {
  const foundTask = allTasks.find((task) => task.id === taskId);
  const filteredFiles = foundTask?.files?.filter((item) => item.id !== fileId);
  return allTasks.map((task) => {
    return {
      ...task,
      files: task.id === foundTask?.id ? filteredFiles : task.files,
    };
  });
};
