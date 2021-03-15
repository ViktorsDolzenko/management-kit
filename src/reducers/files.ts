import { ServerFileType } from "components/Files/fileType";
import { taskExtend } from "../context/storage";
import { db, fieldValue } from "../Service/firebase";

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

export const deleteFileFromServer = async (
  taskId: number,
  file: ServerFileType
) => {
  await db
    .collection("tasks-collection")
    .doc("tasks")
    .set(
      {
        [taskId]: {
          files: fieldValue.arrayRemove({
            ...file,
            taskID: taskId,
          }),
        },
      },
      { merge: true }
    );
};
