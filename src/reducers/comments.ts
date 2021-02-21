import { commentType } from "../components/Tasks/taskItems";
import { db, fieldValue } from "Service/firebase";

/*export const addNewComments = async (
  taskId: number,
  newComment: commentType
) => {
  await db
    .collection("tasks-collection")
    .doc("tasks")
    .set(
      {
        [taskId]: { comments: fieldValue.arrayUnion(newComment) },
      },
      { merge: true }
    );
};*/
