import React, { createContext, Dispatch, useReducer } from "react";
import {
  backLog,
  commentType,
  taskItemsType,
  toDo,
} from "../components/Tasks/taskItems";
import { ActionType } from "./actions";
import {
  addNewTask,
  openTask,
  toggleTaskCompleteById,
} from "../reducers/tasks";
import { addNewComments } from "../reducers/comments";
import { removeFile } from "../reducers/files";

export interface taskExtend extends taskItemsType {
  isOpened?: number;
}

export const TASKS_STORAGE_KEY = "tasks";

type StoreType = {
  tasks: taskExtend[];
  comments?: commentType[];
};

type Action = {
  type: string;
  payload: any;
};

const getTasks = () => {
  const tasksFromLocalStorage = localStorage.getItem(TASKS_STORAGE_KEY);
  if (tasksFromLocalStorage) {
    return JSON.parse(tasksFromLocalStorage);
  }
  return [...backLog, ...toDo];
};

const initialState: StoreType = {
  tasks: getTasks(),
  comments: [],
};

const StorageContext = createContext<{
  state: StoreType;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

interface StorageProviderProps {
  children: React.ReactNode;
}

const reducer = (state: StoreType, { type, payload }: Action) => {
  switch (type) {
    case ActionType.SET_TASK_FOR_VIEW:
      return { ...state, tasks: openTask(state.tasks, payload) };
    case ActionType.TOGGLE_TASK_COMPLETE:
      return { ...state, tasks: toggleTaskCompleteById(state.tasks, payload) };
    case ActionType.ADD_COMMENT:
      return {
        ...state,
        comments: addNewComments(state.tasks, payload.taskId, payload.comment),
      };
    case ActionType.DELETE_FILE:
      return {
        ...state,
        tasks: removeFile(payload.fileId, state.tasks, payload.taskId),
      };
    case ActionType.ADD_NEW_TASK:
      return {
        ...state,
        tasks: addNewTask(state.tasks, payload),
      };

    default:
      return { ...state };
  }
};

const StorageProvider = ({ children }: StorageProviderProps) => {
  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StorageContext.Provider value={{ state, dispatch }}>
      {children}
    </StorageContext.Provider>
  );
};

export { StorageProvider, StorageContext };
