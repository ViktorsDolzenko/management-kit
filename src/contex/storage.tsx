import React, { createContext, Dispatch, useReducer } from "react";

import { taskItemsType } from "components/Tasks/taskItems";

type StoreType = {
  tasks: taskItemsType[];
  taskForView?: taskItemsType;
};

type Action = {
  type: string;
  payload: any;
};

const DEFAULT_VALUE: StoreType = {
  tasks: [],
  taskForView: undefined,
};

const StorageContext = createContext<{
  state: StoreType;
  dispatch: Dispatch<any>;
}>({
  state: DEFAULT_VALUE,
  dispatch: () => null,
});

interface StorageProviderProps {
  children: React.ReactNode;
}

export const SET_TASK_FOR_VIEW = "SET_TASK_FOR_VIEW";

const reducer = (state: StoreType, action: Action) => {
  switch (action.type) {
    case SET_TASK_FOR_VIEW:
      return { ...state, taskForView: action.payload };
    default:
      return { ...state };
  }
};

const StorageProvider = ({ children }: StorageProviderProps) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_VALUE);

  return (
    <StorageContext.Provider value={{ state, dispatch }}>
      {children}
    </StorageContext.Provider>
  );
};

export { StorageProvider, StorageContext };
