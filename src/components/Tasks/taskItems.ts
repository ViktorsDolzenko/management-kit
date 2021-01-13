import photo_1 from "./images/photo-1.png";
import photo_2 from "./images/photo-2.png";
import photo_3 from "./images/photo-3.png";

export type taskItemsType = {
  done: boolean;
  title: string;
  image: string;
  tag: string;
  id: number;
  date?: string;
  assign?: string;
  description?: string;
};

export const backLog: taskItemsType[] = [
  {
    id: 101,
    done: true,
    title: "E-mail after registration so that I can confirm my address",
    image: photo_1,
    tag: "Development",
  },
  {
    id: 102,
    done: false,
    title: "Find top 5 customers and get reviews from them",
    image: photo_2,
    tag: "Marketing",
    date: "Tue, Dec 25",
    assign: "Linzell Bowman",
    description:
        "Task Descriptions are used during project planning, project execution and project control. During project planning the task descriptions are used for scope planning and creating estimates. During project execution the task description is used by those doing the activities to ensure they are doing the work correctly.",
  },
  {
    id: 103,
    done: false,
    title: "Two-factor authentication to make my private data more secure",
    image: photo_3,
    tag: "Design",
  },
];

export const toDo: taskItemsType[] = [
  {
    id: 201,
    done: false,
    title: "An option to search in current projects or in all projects",
    image: photo_1,
    tag: "Design",
  },
  {
    id: 202,
    done: false,
    title: "Account for teams and personal in bottom style",
    image: photo_2,
    tag: "Marketing",
  },
  {
    id: 203,
    done: false,
    title:
        "Listing on Product Hunt so that we can reach as many potential users",
    image: photo_3,
    tag: "Design",
  },
];
