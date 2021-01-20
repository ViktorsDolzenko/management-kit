import { commentType } from "../components/Tasks/taskItems";

export const ActionType = {
  SET_TASK_FOR_VIEW: "SET_TASK_FOR_VIEW",
  TOGGLE_TASK_COMPLETE: "TOGGLE_TASK_COMPLETE",
  ADD_COMMENT: "ADD_COMMENT",
};

export const setTaskForView = (task: any) => ({
  type: ActionType.SET_TASK_FOR_VIEW,
  payload: task,
});

export const taskIsChecked = (taskId: number) => ({
  type: ActionType.TOGGLE_TASK_COMPLETE,
  payload: taskId,
});

export const addComment = (comment: commentType, taskId: number) => ({
  type: ActionType.ADD_COMMENT,
  payload: {
    comment,
    taskId,
  },
});
