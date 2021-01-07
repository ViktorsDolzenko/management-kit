import photo_1 from "./images/photo-1.png";
import photo_2 from "./images/photo-2.png";
import photo_3 from "./images/photo-3.png";

export type taskItemsType = {
  checkbox: boolean;
  task: string;
  image: string;
  tag: string;
  id: any;
};

export const backLog: taskItemsType[] = [
  {
    id: 101,
    checkbox: true,
    task: "E-mail after registration so that I can confirm my address",
    image: photo_1,
    tag: "Development",
  },
  {
    id: 102,
    checkbox: false,
    task: "Find top 5 customers and get reviews from them",
    image: photo_2,
    tag: "Marketing",
  },
  {
    id: 103,
    checkbox: false,
    task: "Two-factor authentication to make my private data more secure",
    image: photo_3,
    tag: "Design",
  },
];

export const toDo: taskItemsType[] = [
  {
    id: 201,
    checkbox: false,
    task: "An option to search in current projects or in all projects",
    image: photo_1,
    tag: "Design",
  },
  {
    id: 202,
    checkbox: false,
    task: "Account for teams and personal in bottom style",
    image: photo_2,
    tag: "Marketing",
  },
  {
    id: 203,
    checkbox: false,
    task:
      "Listing on Product Hunt so that we can reach as many potential users",
    image: photo_3,
    tag: "Design",
  },
];
