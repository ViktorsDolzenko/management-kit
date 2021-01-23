import photo_1 from "./images/photo-1.png";
import photo_2 from "./images/photo-2.png";
import photo_3 from "./images/photo-3.png";
import commentPhoto_1 from "components/Comment/images/commentPhoto1.png";
import commentPhoto_2 from "components/Comment/images/commentPhoto2.png";
import { TAG_TYPE } from "../Tag/tagProps";
import { FILE_TYPE, FileItemsTypes } from "components/File/fileType";
import fileMock from "components/TaskDescription/images/Base.png";

export type commentType = {
  author: string;
  createDate: string;
  text: string;
  vacancy: string;
  id: number;
  photo: string;
};

export enum TASK_TYPE {
  TODO = "toDo",
  BACKLOG = "backLog",
}

export type taskItemsType = {
  done: boolean;
  title: string;
  image: string;
  tag: string;
  id: number;
  date?: string;
  assign?: string;
  description?: string;
  tagType?: TAG_TYPE;
  comments?: commentType[];
  type?: TASK_TYPE;
  files?: FileItemsTypes[];
};

export const backLog: taskItemsType[] = [
  {
    id: 101,
    done: true,
    title: "E-mail after registration so that I can confirm my address",
    image: photo_1,
    tag: "Development",
    tagType: TAG_TYPE.primary,
    type: TASK_TYPE.BACKLOG,
    comments: [],
  },
  {
    id: 102,
    done: false,
    title: "Find top 5 customers and get reviews from them",
    image: photo_2,
    tag: "Marketing",
    tagType: TAG_TYPE.secondary,
    date: "Tue, Dec 25",
    assign: "Linzell Bowman",
    description:
      "Task Descriptions are used during project planning, project execution and project control. During project planning the task descriptions are used for scope planning and creating estimates. During project execution the task description is used by those doing the activities to ensure they are doing the work correctly.",
    type: TASK_TYPE.BACKLOG,
    comments: [
      {
        id: 201,
        author: "Helena Brauer",
        createDate: "Yesterday at 12:37",
        text:
          "During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes",
        vacancy: "Designer",
        photo: commentPhoto_1,
      },
      {
        id: 202,
        author: "Prescott MacCaffery",
        createDate: "Yesterday at 12:37",
        text:
          "@Helena Software quality assurance activity in which one or several humans check a program mainly",
        vacancy: "Developer",
        photo: commentPhoto_2,
      },
    ],
    files: [
      {
        id: 501,
        fileType: FILE_TYPE.PDF,
        fileName: "Redesign Brief 2019.pdf",
        fileSize: "159 KB",
      },
      {
        id: 502,
        image: fileMock,
        fileName: "Header.png",
        fileSize: "129 KB",
      },
    ],
  },
  {
    id: 103,
    done: false,
    title: "Two-factor authentication to make my private data more secure",
    image: photo_3,
    tag: "Design",
    tagType: TAG_TYPE.simple,
    type: TASK_TYPE.BACKLOG,
    comments: [],
  },
];

export const toDo: taskItemsType[] = [
  {
    id: 201,
    done: false,
    title: "An option to search in current projects or in all projects",
    image: photo_1,
    tag: "Design",
    tagType: TAG_TYPE.simple,
    type: TASK_TYPE.TODO,
    comments: [],
  },
  {
    id: 202,
    done: false,
    title: "Account for teams and personal in bottom style",
    image: photo_2,
    tag: "Marketing",
    tagType: TAG_TYPE.secondary,
    type: TASK_TYPE.TODO,
    comments: [],
  },
  {
    id: 203,
    done: false,
    title:
      "Listing on Product Hunt so that we can reach as many potential users",
    image: photo_3,
    tag: "Design",
    tagType: TAG_TYPE.simple,
    type: TASK_TYPE.TODO,
    comments: [],
  },
];
