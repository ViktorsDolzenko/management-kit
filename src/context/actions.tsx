export const ActionType = {
  SET_TASK_FOR_VIEW: "SET_TASK_FOR_VIEW",
  TOGGLE_TASK_COMPLETE: "TOGGLE_TASK_COMPLETE",
};

export const setTaskForView = (task: any) => ({
  type: ActionType.SET_TASK_FOR_VIEW,
  payload: task,
});

export const taskIsChecked = (taskId: number) => ({
  type: ActionType.TOGGLE_TASK_COMPLETE,
  payload: taskId,
});
