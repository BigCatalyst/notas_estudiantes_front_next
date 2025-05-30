/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import MensageError from "@/components/message/MensageError";
import MensageExito from "@/components/message/MensageExito";
import Buttom from "@/components/ui/buttom/Buttom";
import { ACS_MAX } from "@/config";
import {
  StudentNote,
  StudentNoteMultipleByStudent,
  SchoolYearInNote,
  SubjectInNote,
} from "@/services/api/student_note";
import { Student } from "@/services/api/students";
import { Subject } from "@/services/api/subjects";
import ApiService from "@/services/ApiService";
import { useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { BsDatabaseFillX } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { MdEditDocument } from "react-icons/md";
import { RiLoaderLine } from "react-icons/ri";
import { TableQuickEditStudentNote } from "./QuickEditStudentNoteByStudent/TableQuickEditStudentNoteByStudent";

export const QuickEditStudentNoteByStudents = () => {
  return <TableQuickEditStudentNote idStudent="1" />;
};
