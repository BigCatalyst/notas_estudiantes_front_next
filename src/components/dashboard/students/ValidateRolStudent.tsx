/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Rols } from "@/data/NavigationItems";
import { State } from "@/redux/features/authSlice";
import { useSelector } from "react-redux";
import AddStudent from "./AddStudent";
import AddStudentSecretary from "./AddStudentSecretary";
import UpdateStudent from "./UpdateStudent";
import UpdateStudentSecretary from "./UpdateStudentSecretary";

const ValidateRolStudent = ({ isAdd }: { isAdd: boolean }) => {
  const userAuth: State = useSelector((state: any) => state.auth);
  console.log(userAuth.user?.roles[0]);
  console.log(isAdd);
  return (
    <div>
      {isAdd && userAuth.user?.roles.find((val) => val === Rols.admin) && (
        <AddStudent />
      )}

      {isAdd && userAuth.user?.roles.find((val) => val === Rols.secretary) && (
        <AddStudentSecretary />
      )}

      {!isAdd && userAuth.user?.roles.find((val) => val === Rols.admin) && (
        <UpdateStudent />
      )}

      {!isAdd && userAuth.user?.roles.find((val) => val === Rols.secretary) && (
        <UpdateStudentSecretary />
      )}
    </div>
  );
};

export default ValidateRolStudent;
