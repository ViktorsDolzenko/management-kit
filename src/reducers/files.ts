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
  fileName: string,
  fileSize: number,
  fileType: string,
  fileUploadedDate: number,
  fileUploadedBy: string,
  fileUrl: string,
  taskID: number
) => {
  await db
    .collection("tasks-collection")
    .doc("tasks")
    .set(
      {
        [taskID]: {
          files: fieldValue.arrayRemove({
            fileName: fileName,
            fileSize: fileSize,
            fileType: fileType,
            fileUploadDate: fileUploadedDate,
            fileUploadedBy: fileUploadedBy,
            fileUrl: fileUrl,
            taskID: taskID,
          }),
        },
      },
      { merge: true }
    );
};
