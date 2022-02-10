import React, { createContext, Dispatch, useReducer } from "react";

import { taskItemsType } from "components/Tasks/taskItems";
import { ActionType } from "./actions";
import { deleteTaskFromServer, openTask } from "reducers/tasks";
import { db } from "Service/firebase";

export interface taskExtend extends taskItemsType {
  isOpened?: number;
}

export interface ITeams {
    title: string;
    members: string[];
    docId: string;
}

type StoreType = {
  tasks: taskExtend[];
  teams: ITeams[];
  isShowLoginForm: boolean;
  isShowSignUpForm: boolean;
  isShowNewTeamForm: boolean;
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
            return { ...tasks[taskId], id: taskId };
        }
        return taskId;
    });
};

export const getAllTeams = async (): Promise<any> => {
    const teamsRequest = await db.collection("teams").get();
    return teamsRequest.docs.map((item => item.data()));
};

const initialState: StoreType = {
    tasks: [],
    teams: [],
    isShowLoginForm: false,
    isShowSignUpForm: false,
    isShowNewTeamForm: false
};

const StorageContext = createContext<{
  state: StoreType;
  dispatch: Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null
});

interface StorageProviderProps {
  children: React.ReactNode;
}

const reducer = (state: StoreType, { type, payload }: Action) => {
    switch (type) {
        case ActionType.SET_TASK_FOR_VIEW:
            return { ...state, tasks: openTask(state.tasks, payload) };
        case ActionType.DELETE_TASK:
            return {
                ...state,
                tasks: deleteTaskFromServer(payload)
            };
        case ActionType.UPDATE_TASKS:
            return {
                ...state,
                tasks: payload
            };

        case ActionType.SHOW_MODAL_LOGIN_FORM:
            return {
                ...state,
                isShowLoginForm: payload
            };
        case ActionType.SHOW_MODAL_SIGNUP_FORM:
            return {
                ...state,
                isShowSignUpForm: payload
            };
        case ActionType.SHOW_MODAL_NEW_TEAM_FORM:
            return {
                ...state,
                isShowNewTeamForm: payload
            };
        case ActionType.UPDATE_TEAMS:
            return {
                ...state,
                teams: [...state.teams, payload]
            };
        case ActionType.GET_TEAMS:
            return {
                ...state,
                teams: payload
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
