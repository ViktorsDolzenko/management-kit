

export type sidebarItemType = {
  title: string;
  image?: string;
  members?: string[];
  button?: string;
  linkTo?: string;
};

export const sideBarItemsMenu: sidebarItemType[] = [
    { title: "phrases.home", linkTo: '/' },
    { title: "phrases.myTasks", linkTo: '/my-tasks' }
];

