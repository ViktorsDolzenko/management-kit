import { db, fieldValue } from "../Service/firebase";
import { ServerFileType } from "../components/Files/fileType";

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
                        ...file
                    })
                }
            },
            { merge: true }
        );
};
