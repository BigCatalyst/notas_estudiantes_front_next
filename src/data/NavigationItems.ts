import { IconType } from "react-icons";
import { HiUsers } from "react-icons/hi2";
import { FaGraduationCap, FaUserCog, FaUsers } from "react-icons/fa";
import { MdBallot, MdLogout } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { ImBooks } from "react-icons/im";
import { PiUserListBold } from "react-icons/pi";
import { GrUserWorker } from "react-icons/gr";
import { FaSchoolFlag } from "react-icons/fa6";

export enum Rols {
  admin = "admin",
  student = "student",
  profesor = "profesor",
  secretary = "secretary",
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
    rols: [Rols.admin],
    Icon: TbLayoutDashboardFilled,
  },
  {
    name: "Estudiantes",
    path: "/dashboard/students",
    rols: [Rols.admin],
    Icon: FaUsers,
  },
  {
    name: "Asignaturas",
    path: "/dashboard/subjects",
    rols: [Rols.admin],
    Icon: ImBooks,
  },
  {
    name: "Estudiante Nota",
    path: "/dashboard/student_note",
    rols: [Rols.admin],
    Icon: PiUserListBold,
  },
  {
    name: "Carreras",
    path: "/dashboard/careers",
    rols: [Rols.admin],
    Icon: GrUserWorker,
  },
  {
    name: "Estudiante Boleta",
    path: "/dashboard/students_ballot",
    rols: [Rols.admin],
    Icon: MdBallot,
  },
  {
    name: "Año Escolar",
    path: "/dashboard/school_year",
    rols: [Rols.admin],
    Icon: FaSchoolFlag,
  },
  {
    name: "Bajas",
    path: "/dashboard/dropouts",
    rols: [Rols.admin],
    Icon: FaGraduationCap,
  },
  {
    name: "Carreras Otorgadas",
    path: "/dashboard/grant_career",
    rols: [Rols.admin],
    Icon: FaGraduationCap,
  },
  {
    name: "Escalafón",
    path: "/dashboard/degree_scale",
    rols: [Rols.admin],
    Icon: FaGraduationCap,
  },
  {
    name: "Usuarios",
    path: "/dashboard/users",
    rols: [Rols.admin],
    Icon: HiUsers,
  },
  {
    name: "Perfil",
    path: "/dashboard/profile",
    rols: [Rols.admin],
    Icon: FaUserCog,
  },
  {
    name: "Logout",
    path: "/logout",
    rols: [Rols.admin],
    Icon: MdLogout,
  },
];
