import { commentType, taskItemsType } from "./components/Tasks/taskItems";
import { toggleTaskCompleteById } from "./reducers/tasks";
import { getTasks } from "./context/storage";
import { updateTasks } from "./context/actions";
import { TAG_TYPE } from "./components/Tag/tagProps";

// function to get generate new unique id
export const getNewId = (comments: commentType[]) => {
    const sortedArray = comments
        .map((comment) => comment.id)
        .sort((a, b) => a - b);
    const lastId = sortedArray[sortedArray.length - 1];
    if (lastId) {
        return lastId + 1;
    }
    return Math.floor(Math.random() * (500 - 100) + 100);
};

// function to generate unique task id
export const getTaskNewId = (tasks: taskItemsType[]) => {
    if (tasks.length === 0) {
        return Math.floor(Math.random() * (500 - 100) + 100);
    }
    const sortedArray = tasks.map((task) => task.id).sort((a, b) => a - b);
    const lastId = sortedArray[sortedArray.length - 1];
    return Number(lastId) + 1;
};

// timer function to get count down
export const countDownFunc = (timeLeft: any) => {
    const countDownDate = new Date("April 20, 2022 10:37").getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance > 0) {
        return timeLeft(
            days + "d " + hours + "h " + minutes + "m " + seconds + "s "
        );
    }
    timeLeft("Expired");
};

export const open = (setOpen: (value: boolean) => void) => {
    return setOpen(true);
};

export const close = (setClose: (value: boolean) => void) => {
    return setClose(false);
};

export const doneTaskHandler = async (
    taskId: number,
    isChecked: boolean,
    dispatch: any
) => {
    await toggleTaskCompleteById(taskId, isChecked);
    const tasks = await getTasks();
    const preparedTasks = tasks.map((task) => {
        if (task.id === taskId) {
            return { ...task, isOpened: true };
        }
        return task;
    });
    dispatch(updateTasks(preparedTasks));
};

const TAGS = {
    DEVELOPMENT: "development",
    MARKETING: "marketing",
    DESIGN: "design"
};

export const tagType = (value: string) => {
    switch (value) {
        case TAGS.DEVELOPMENT: {
            return TAG_TYPE.Primary;
        }
        case TAGS.MARKETING: {
            return TAG_TYPE.Simple;
        }
        case TAGS.DESIGN: {
            return TAG_TYPE.Secondary;
        }
    }
};

export const tagOptions = [
    { value: "development", label: "Development" },
    { value: "marketing", label: "Marketing" },
    { value: "design", label: "Design" }
];
