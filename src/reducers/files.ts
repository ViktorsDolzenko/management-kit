import { db, fieldValue } from "../Service/firebase";
import { ServerFileType } from "../components/Files/fileType";

// export const removeFile = (
//   fileId: number,
//   allTasks: taskExtend[],
//   taskId: number
// ) => {
//   const foundTask = allTasks.find((task) => task.id === taskId);
//   const filteredFiles = foundTask?.files?.filter((item) => item.id !== fileId);
//   return allTasks.map((task) => {
//     return {
//       ...task,
//       files: task.id === foundTask?.id ? filteredFiles : task.files,
//     };
//   });
// };

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
          }),
        },
      },
      { merge: true }
    );
};
