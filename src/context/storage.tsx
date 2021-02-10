import {
  backLog,
  commentType,
  taskItemsType,
  toDo,
} from "components/Tasks/taskItems";
import React, { createContext, Dispatch, useReducer } from "react";
import { addNewComments } from "reducers/comments";
import { removeFile } from "reducers/files";
import {
  addNewTask,
  deleteTask,
  openTask,
  toggleTaskCompleteById,
} from "reducers/tasks";
import { db } from "../firebase";
import { ActionType } from "./actions";

export interface taskExtend extends taskItemsType {
  isOpened?: number;
}

type StoreType = {
  tasks: taskExtend[];
  comments?: commentType[];
};
type Action = {
  type: string;
  payload: any;
};

export const getTasks = async (): Promise<taskItemsType[]> => {
  const tasksDb = await db.collection("tasks-collection").doc("tasks");
  const tasksData = await tasksDb.get();
  const tasks = tasksData.data();

  return Object.keys(tasks ? tasks : {}).map((taskId) => {
    if (tasks) {
      return tasks[taskId];
    }
    return taskId;
  });
};

const initialState: StoreType = {
  tasks: [...backLog, ...toDo],
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
    case ActionType.DELETE_TASK:
      return {
        ...state,
        tasks: deleteTask(state.tasks, payload),
      };
    case ActionType.UPDATE_TASKS:
      return {
        ...state,
        tasks: payload,
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
