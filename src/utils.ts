import { commentType } from "./components/Tasks/taskItems";

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
