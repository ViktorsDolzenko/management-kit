import dashboard from "./images/dashboard.svg";
import crm from "./images/crm.svg";
import websiteRedesign from "./images/website-redesign.svg";
import communication from "./images/communication.svg";

export type sidebarItemType = {
  title: string;
  image?: string;
};

export const sideBarItemsMenu: sidebarItemType[] = [
  { title: "Home" },
  { title: "My Tasks" },
  { title: "Notification" },
];

export const sideBarItemsTeams: sidebarItemType[] = [
  { title: "Designers" },
  { title: "Backend" },
  { title: "Frontend" },
];

export const sideBarItemsProjects: sidebarItemType[] = [
  {
    title: "Dashboard UI Kit",
    image: dashboard,
  },
  {
    title: "CRM System",
    image: crm,
  },
  {
    title: "Website Redesign",
    image: websiteRedesign,
  },
  {
    title: "Communication Tool",
    image: communication,
  },
];
