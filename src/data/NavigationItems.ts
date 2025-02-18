import { IconType } from "react-icons";
import { HiUsers } from "react-icons/hi2";
import { FaUserCog, FaUsers } from "react-icons/fa";
import { MdBallot, MdLogout } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { ImBooks } from "react-icons/im";
import { PiUserListBold } from "react-icons/pi";
import { GrUserWorker } from "react-icons/gr";
import { FaSchoolFlag } from "react-icons/fa6";

export enum Rols {
  admin = "admin",
  user = "user",
  student = "student",
}

interface NavItem {
  name: string;
  path: string;
  rols?: Rols[];
  Icon?: IconType;
}

export const navigationItemsHome: NavItem[] = [
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];

export const navigationItemsDashboard: NavItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    rols: [Rols.admin, Rols.user],
    Icon: TbLayoutDashboardFilled,
  },
  {
    name: "Students",
    path: "/dashboard/students",
    rols: [Rols.admin],
    Icon: FaUsers,
  },
  {
    name: "Subjects",
    path: "/dashboard/subjects",
    rols: [Rols.admin],
    Icon: ImBooks,
  },
  {
    name: "Student Note",
    path: "/dashboard/student_note",
    rols: [Rols.admin],
    Icon: PiUserListBold,
  },
  {
    name: "Careers",
    path: "/dashboard/careers",
    rols: [Rols.admin],
    Icon: GrUserWorker,
  },
  {
    name: "Students Ballot",
    path: "/dashboard/students_ballot",
    rols: [Rols.admin],
    Icon: MdBallot,
  },
  {
    name: "School Year",
    path: "/dashboard/school_year",
    rols: [Rols.admin],
    Icon: FaSchoolFlag,
  },
  {
    name: "Users",
    path: "/dashboard/users",
    rols: [Rols.admin],
    Icon: HiUsers,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    rols: [Rols.admin, Rols.user],
    Icon: FaUserCog,
  },
  {
    name: "Logout",
    path: "/logout",
    rols: [Rols.admin, Rols.user],
    Icon: MdLogout,
  },
];
