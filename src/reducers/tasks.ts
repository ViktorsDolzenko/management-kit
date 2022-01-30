import { taskExtend } from "context/storage";
import { db, deleteField } from "Service/firebase";

export const toggleTaskCompleteById = async (
    taskId: number,
    isChecked: boolean
) => {
    await db
        .collection("tasks-collection")
        .doc("tasks")
        .set(
            {
                [taskId]: { done: !isChecked }
            },
            { merge: true }
        );
};

export const openTask = (allTasks: taskExtend[], taskId: number) => {
    return allTasks.map((task) => {
        return {
            ...task,
            isOpened: taskId === task.id
        };
    });
};

export const deleteTaskFromServer = async (taskId: number) => {
    await db
        .collection("tasks-collection")
        .doc("tasks")
        .update({
            [taskId]: deleteField
        });
};
