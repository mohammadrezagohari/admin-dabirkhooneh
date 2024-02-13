/* eslint-disable no-sparse-arrays */
/** Icons are imported separatly to reduce build time */
import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import TableCellsIcon from "@heroicons/react/24/outline/TableCellsIcon";
import CodeBracketSquareIcon from "@heroicons/react/24/outline/CodeBracketSquareIcon";
import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import {
  Secretary,
  Juror,
  Assistant,
  Dashboard,
  AssistantList,
  Participant,
  CategoryList,
  NewJuror,
  NewJurorCat,
  MyJurorLists,
  NewRegWorksList,
  WorksList,
  MyWorkslist,
  WorkList4comment,
  Category,
  NewCategory,
  ParticipantWorkslist,
  General,
  GeneralCatList,
  GeneralWorksList,
  RegNewAssisIn,
  RegNewAssisOut,
  Profile,
  LooksProvenToMe,
  WorksListComment,
  NewWorks,
} from "../components/panelItems/panelItems";
import { PiUserCircleGearThin } from "react-icons/pi";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsListStars } from "react-icons/bs";
import { TbCategory2 } from "react-icons/tb";
import { GoChecklist } from "react-icons/go";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { TfiCommentAlt } from "react-icons/tfi";
import {
  AssisIcons,
  JurorsIcon,
  ListsIcons,
  UserIcons,
} from "../components/icons/icons";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [];

export default routes;

export const adminRoutes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon />,
    name: <Dashboard />,
  },

  {
    path: "/app/assistance/list", // url
    icon: <AssisIcons />, // icon component
    name: <AssistantList />, // name that appear in Sidebar
  },
  {
    path: "/app/participant/list",
    icon: <UserIcons />,
    name: <Participant />,
  },
  {
    path: "/app/referee/list",
    icon: <JurorsIcon />,
    name: <Juror />,
  },

  {
    path: "/app/works", // url
    icon: <DocumentTextIcon className={`${iconClasses} inline`} />, // icon component
    name: <ParticipantWorkslist />, // name that appear in Sidebar
  },

  {
    path: "/app/category/list", // url
    icon: <TbCategory2 className={`${iconClasses} inline`} />, // icon component
    name: <CategoryList />, // name that appear in Sidebar
  },
];

export const assistantRoutes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={`${iconClasses} inline`} />,
    name: <Dashboard />,
  },
  {
    path: "/app/jurors", // url
    icon: <JurorsIcon className={`${iconClasses} inline`} />, // icon component
    name: <MyJurorLists />, // name that appear in Sidebar
  },
  {
    path: "/app/new/works",
    icon: <GoChecklist className={`${iconClasses} inline`} />,
    name: <NewRegWorksList />,
  },
  {
    path: "/app/works",
    icon: <DocumentTextIcon className={`${iconClasses} inline`} />,
    name: <WorksList />,
  },
];

export const jurorRoutes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={`${iconClasses} inline`} />,
    name: <Dashboard />,
  },

  {
    path: "/app/works", // url
    icon: <DocumentTextIcon className={`${iconClasses} inline`} />, // icon component
    name: <WorksListComment />, // name that appear in Sidebar
  },
  {
    path: "/app/my/comments", // url
    icon: <TfiCommentAlt className={`${iconClasses} inline`} />, // icon component
    name: <LooksProvenToMe />, // name that appear in Sidebar
  },
];

export const participantRoutes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={`${iconClasses} inline`} />,
    name: <Dashboard />,
  },

  {
    path: "/app/my/works",
    icon: <DocumentTextIcon className={`${iconClasses} inline`} />,
    name: <MyWorkslist />,
  },
  {
    path: "/app/post/work", // url
    icon: <MdOutlinePlaylistAdd className={`${iconClasses} inline`} />, // icon component
    name: <NewWorks />, // name that appear in Sidebar
  },
];

export const peopleRoutes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={`${iconClasses} inline`} />,
    name: <Dashboard />,
  },

  {
    path: "/app/work", // url
    icon: <CalendarDaysIcon className={`${iconClasses} inline`} />, // icon component
    name: <ParticipantWorkslist />, // name that appear in Sidebar
  },
  {
    path: "", //no url needed as this has submenu
    icon: <DocumentTextIcon className={`${iconClasses} inline`} />, // icon component
    name: <General />, // name that appear in Sidebar
    submenu: [
      {
        path: "/app/general-gategory-list", // url
        icon: <DocumentTextIcon className={`${iconClasses} inline`} />, // icon component
        name: <GeneralCatList />, // name that appear in Sidebar
      },
      {
        path: "/app/art-list",
        icon: <TableCellsIcon className={`${iconClasses} inline`} />,
        name: <GeneralWorksList />,
      },
    ],
  },
];
