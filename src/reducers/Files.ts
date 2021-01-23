import { taskItemsType } from "../components/Tasks/taskItems";

export const removeFile = (fileId: number, task: taskItemsType) => {
  const filteredFiles = task.files?.filter((item) => item.id !== fileId);

  return {
    ...task,
    files: filteredFiles,
  };
};
