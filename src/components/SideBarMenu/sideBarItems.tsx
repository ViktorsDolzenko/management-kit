import dashboard from "./images/dashboard.svg";
import crm from "./images/crm.svg";
import websiteRedesign from "./images/website-redesign.svg";
import communication from "./images/communication.svg";
import designer_1 from "./images/designer-1.svg";
import designer_2 from "./images/designer-2.svg";
import designer_3 from "./images/designer-3.svg";
import backend_1 from "./images/backend-1.svg";
import backend_2 from "./images/backend-2.svg";
import frontend_1 from "./images/frontend-1.svg";
import frontend_2 from "./images/frontend-2.svg";
import frontend_3 from "./images/frontend-3.svg";
import frontend_4 from "./images/frontend-4.svg";

export type sidebarItemType = {
  title: string;
  image?: string;
  team?: string[];
  button?: string;
};

export const sideBarItemsMenu: sidebarItemType[] = [
  { title: "Home" },
  { title: "My Tasks" },
  { title: "Notification" },
];

export const sideBarItemsTeams: sidebarItemType[] = [
  { title: "Designers", team: [designer_1, designer_2, designer_3] },
  { title: "Backend", team: [backend_1, backend_2] },
  { title: "Frontend", team: [frontend_1, frontend_2, frontend_3, frontend_4] },
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
