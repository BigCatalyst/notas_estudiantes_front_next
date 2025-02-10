import { IconType } from "react-icons";
import { HiUsers } from "react-icons/hi2";
import { FaUserCog } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

enum Rols {
  admin = "admin",
  editor = "editor",
  user = "user",
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
    name: "Users",
    path: "/dashboard/users",
    rols: [Rols.admin],
    Icon: HiUsers,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    rols: [Rols.admin, Rols.user, Rols.editor],
    Icon: FaUserCog,
  },
  {
    name: "Logout",
    path: "/logout",
    rols: [Rols.admin, Rols.user, Rols.editor],
    Icon: MdLogout,
  },
];
