import { IconType } from "react-icons";
import { HiUsers } from "react-icons/hi2";
import { FaUserCog } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";

enum Rols {
  admin = "admin",
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
    name: "Dashboard",
    path: "/dashboard",
    rols: [Rols.admin, Rols.user],
    Icon: TbLayoutDashboardFilled,
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
