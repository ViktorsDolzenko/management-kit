import React, { createContext, Dispatch, useReducer } from "react";
import {
  backLog,
  commentType,
  taskItemsType,
  toDo,
} from "../components/Tasks/taskItems";
import { ActionType } from "./actions";
import { toggleTaskCompleteById } from "../reducers/tasks";
import { addNewComments } from "../reducers/comments";
import { removeFile } from "../reducers/Files";

type StoreType = {
  tasks: taskItemsType[];
  taskForView?: taskItemsType;
  comments?: commentType[];
};

type Action = {
  type: string;
  payload: any;
};

const initialState: StoreType = {
  tasks: [...backLog, ...toDo],
  taskForView: undefined,
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
      return { ...state, taskForView: payload };
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
        taskForView: removeFile(payload.fileId, payload.task),
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
