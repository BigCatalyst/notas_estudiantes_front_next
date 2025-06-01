import { IconType } from "react-icons";
import { HiUsers } from "react-icons/hi2";
import {
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaTrophy,
  FaUserCog,
  FaUserMinus,
  FaUsers,
} from "react-icons/fa";
import { MdBallot, MdLogout, MdOutlineSchool } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { ImBooks } from "react-icons/im";
import { PiUserListBold } from "react-icons/pi";
import { GrUserWorker } from "react-icons/gr";
import { FaSchoolFlag } from "react-icons/fa6";
import { GiBookCover } from "react-icons/gi";
import { BiEdit } from "react-icons/bi";
import { MdOutlinePlaylistAdd } from "react-icons/md";

export enum Rols {
  admin = "admin",
  student = "estudiante",
  profesor = "professor",
  secretary = "secretary",
}

interface NavItem {
  name: string;
  path?: string;
  rols?: Rols[];
  Icon?: IconType;
  children?: NavItem[];
}

export const navigationItemsHome: NavItem[] = [
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];

export const navigationItemsDashboard: NavItem[] = [
  {
    name: "Panel Informativo",
    path: "/dashboard",
    rols: [Rols.admin, Rols.profesor, Rols.secretary, Rols.student],
    Icon: TbLayoutDashboardFilled,
  },
  {
    name: "Editar Boleta",
    path: "/dashboard/students/ballot_edit",
    rols: [Rols.student],
    Icon: BiEdit,
  },
  {
    name: "Nomencladores",
    Icon: MdOutlinePlaylistAdd,
    rols: [Rols.admin, Rols.secretary],
    children: [
      {
        name: "Año Escolar",
        path: "/dashboard/school_year",
        Icon: FaSchoolFlag,
      },
      {
        name: "Grupos de Estudiantes",
        path: "/dashboard/student_group",
        Icon: FaUsers,
      },
      {
        name: "Carreras",
        path: "/dashboard/careers",
        Icon: GrUserWorker,
      },
      {
        name: "Asignaturas",
        path: "/dashboard/subjects",
        Icon: ImBooks,
      },
    ],
  },
  {
    name: "Profesores",
    path: "/dashboard/professor",
    rols: [Rols.admin, Rols.secretary],
    Icon: MdOutlineSchool,
  },
   {
    name: "Estudiantes",
    Icon: FaUsers,
    rols: [Rols.admin, Rols.secretary],
    children: [
      {
        name: "Estudiantes",
        Icon: FaUsers,
        path: "/dashboard/students",
      },
      {
        name: "Notas de Estudiantes",
        path: "/dashboard/student_note",
        Icon: PiUserListBold,
      },
      {
        name: "Boleta de Estudiantes",
        path: "/dashboard/students_ballot",
        Icon: MdBallot,
      },
      {
        name: "Altas y Bajas",
        path: "/dashboard/dropouts",
        Icon: FaUserMinus,
      },
    ],
  },
  {
    name: "Mis Notas",
    path: "/dashboard/student_note/me",
    rols: [Rols.student],
    Icon: PiUserListBold,
  },
  {
    name: "Escalafón",
    path: "/dashboard/degree_scale",
    rols: [Rols.admin, Rols.profesor, Rols.secretary, Rols.student],
    Icon: FaTrophy,
  },
  {
    name: "Carreras Otorgadas",
    path: "/dashboard/grant_career",
    rols: [Rols.admin, Rols.profesor, Rols.secretary, Rols.student],
    Icon: GiBookCover,
  },
  {
    name: "Aula Virtual",
    path: "/dashboard/virtual_classroom",
    rols: [Rols.admin, Rols.profesor, Rols.student],
    Icon: FaChalkboardTeacher,
  },
  {
    name: "Eventos Escolares",
    path: "/dashboard/school_event",
    rols: [Rols.admin, Rols.secretary],
    Icon: FaCalendarAlt,
  },
  {
    name: "Calendario Eventos",
    path: "/dashboard/calendar_school_event",
    rols: [Rols.admin, Rols.profesor, Rols.secretary, Rols.student],
    Icon: FaCalendarAlt,
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
    rols: [Rols.admin, Rols.profesor, Rols.student, Rols.secretary],
    Icon: FaUserCog,
  },
  {
    name: "Cerrar Sesión",
    path: "/logout",
    rols: [Rols.admin, Rols.profesor, Rols.secretary, Rols.student],
    Icon: MdLogout,
  },
];
