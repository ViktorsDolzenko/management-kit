import { commentType } from "../components/Tasks/taskItems";

export const ActionType = {
    SET_TASK_FOR_VIEW: "SET_TASK_FOR_VIEW",
    ADD_COMMENT: "ADD_COMMENT",
    DELETE_FILE: "DELETE_FILE",
    ADD_NEW_TASK: "ADD_NEW_TASK",
    UPDATE_TEAMS: "ADD_NEW_TEAM",
    DELETE_TASK: "DELETE_TASK",
    UPDATE_TASKS: "UPDATE_TASKS",
    GET_TEAMS: "GET_TEAMS",
    SHOW_MODAL_LOGIN_FORM: "SHOW_MODAL_LOGIN_FORM",
    SHOW_MODAL_SIGNUP_FORM: "SHOW_MODAL_SIGNUP_FORM",
    SHOW_MODAL_NEW_TEAM_FORM: "SHOW_MODAL_NEW_TEAM_FORM",
    SORT_FILES: "SORT_FILES"
};

export const setTaskForView = (taskId: any) => ({
    type: ActionType.SET_TASK_FOR_VIEW,
    payload: taskId
});

export const addComment = (comment: commentType, taskId: number) => ({
    type: ActionType.ADD_COMMENT,
    payload: {
        comment,
        taskId
    }
});

export const deleteFile = (fileId: number, taskId: number) => ({
    type: ActionType.DELETE_FILE,
    payload: {
        fileId,
        taskId
    }
});

export const updateTasks = (tasks: any) => ({
    type: ActionType.UPDATE_TASKS,
    payload: tasks
});

export const updateTeams = (team: any) => ({
    type: ActionType.UPDATE_TEAMS,
    payload: team
});

export const getTeams = (teams: any) => ({
    type: ActionType.GET_TEAMS,
    payload: teams
});

export const showLoginForm = (isShow: boolean) => ({
    type: ActionType.SHOW_MODAL_LOGIN_FORM,
    payload: isShow
});

export const showSignUpForm = (isShow: boolean) => ({
    type: ActionType.SHOW_MODAL_SIGNUP_FORM,
    payload: isShow
});

export const showNewTeamForm = (isShow: boolean) => ({
    type: ActionType.SHOW_MODAL_NEW_TEAM_FORM,
    payload: isShow
});
