import { commentType, taskItemsType } from "../components/Tasks/taskItems";

export const ActionType = {
  SET_TASK_FOR_VIEW: "SET_TASK_FOR_VIEW",
  ADD_COMMENT: "ADD_COMMENT",
  DELETE_FILE: "DELETE_FILE",
  ADD_NEW_TASK: "ADD_NEW_TASK",
  DELETE_TASK: "DELETE_TASK",
  UPDATE_TASKS: "UPDATE_TASKS",
};

export const setTaskForView = (taskId: any) => ({
  type: ActionType.SET_TASK_FOR_VIEW,
  payload: taskId,
});

export const addComment = (comment: commentType, taskId: number) => ({
  type: ActionType.ADD_COMMENT,
  payload: {
    comment,
    taskId,
  },
});

export const deleteFile = (fileId: number, taskId: number) => ({
  type: ActionType.DELETE_FILE,
  payload: {
    fileId,
    taskId,
  },
});

export const addNewTask = (newTask: taskItemsType) => ({
  type: ActionType.ADD_NEW_TASK,
  payload: newTask,
});

export const deleteTask = (taskId: number) => ({
  type: ActionType.DELETE_TASK,
  payload: taskId,
});

export const updateTasks = (tasks: any) => ({
  type: ActionType.UPDATE_TASKS,
  payload: tasks,
});
