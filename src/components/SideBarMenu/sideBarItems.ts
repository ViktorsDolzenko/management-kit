import dashboard from "./images/dashboard.svg";
import crm from "./images/crm.svg";
import websiteRedesign from "./images/website-redesign.svg";
import communication from "./images/communication.svg";
import designer_1 from "./images/designer_1.png";
import designer_2 from "./images/designer_2.png";
import designer_3 from "./images/designer_3.png";
import backend_1 from "./images/backend_1.png";
import backend_2 from "./images/backend_2.png";
import frontend_1 from "./images/frontend_1.png";
import frontend_2 from "./images/frontend_2.png";
import frontend_3 from "./images/frontend_3.png";
import frontend_4 from "./images/frontend_4.png";

export type sidebarItemType = {
  title: string;
  image?: string;
  team?: string[];
  button?: string;
};

export const sideBarItemsMenu: sidebarItemType[] = [
  { title: "Home" },
  { title: "My TasksPage" },
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
