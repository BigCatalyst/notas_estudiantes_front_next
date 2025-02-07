import { IconType } from "react-icons";
import { AiFillPieChart } from "react-icons/ai";
import { BsQrCode } from "react-icons/bs";
import { HiBellAlert } from "react-icons/hi2";
import { FaBookOpenReader } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import { BiSupport } from "react-icons/bi";
import { FaUserCog } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { MdSell } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";

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
    name: "Dashboard",
    path: "/dashboard",
    rols: [Rols.admin, Rols.user, Rols.editor],
    Icon: AiFillPieChart,
  },
  {
    name: "Promo Codes",
    path: "/dashboard/promo-codes",
    rols: [Rols.admin, Rols.user],
    Icon: BsQrCode,
  },
  {
    name: "Sales",
    path: "/dashboard/sales",
    rols: [Rols.admin, Rols.editor],
    Icon: MdSell,
  },
  {
    name: "Products",
    path: "/dashboard/products",
    rols: [Rols.admin, Rols.editor],
    Icon: AiFillProduct,
  },
  {
    name: "Notifications",
    path: "/dashboard/notifications",
    rols: [Rols.admin, Rols.user],
    Icon: HiBellAlert,
  },
  {
    name: "Resources",
    path: "/dashboard/resources",
    rols: [Rols.admin, Rols.user],
    Icon: FaBookOpenReader,
  },
  {
    name: "Users",
    path: "/dashboard/users",
    rols: [Rols.admin],
    Icon: HiUsers,
  },

  {
    name: "Support",
    path: "/dashboard/support",
    rols: [Rols.admin],
    Icon: BiSupport,
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
