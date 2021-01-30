import { commentType, taskItemsType } from "./components/Tasks/taskItems";

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

export const getTaskNewId = (tasks: taskItemsType[]) => {
  const sortedArray = tasks.map((task) => task.id).sort((a, b) => a - b);
  const lastId = sortedArray[sortedArray.length - 1];
  return lastId + 1;
};

export const countDownFunc = (timeLeft: any) => {
  const countDownDate = new Date("Feb 26, 2021 13:57").getTime();
  const countDown = setInterval(() => {
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
    clearInterval(countDown);
    timeLeft("Expired");
  }, 100);
};