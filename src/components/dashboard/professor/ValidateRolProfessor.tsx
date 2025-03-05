/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { State } from "@/redux/features/authSlice";
import { useSelector } from "react-redux";
import { AddProfessor } from "./AddProfessor";
import AddProfessorSecretary from "./AddProfessorSecretary";
import { UpdateProfessor } from "./UpdateProfessor";
import UpdateProfessorSecretary from "./UpdateProfessorSecretary";
import { Rols } from "@/data/NavigationItems";

const ValidateRolProfessor = ({ isAdd }: { isAdd: boolean }) => {
  const userAuth: State = useSelector((state: any) => state.auth);
  return (
    <div>
      {isAdd && userAuth.user?.roles.find((val) => val === Rols.admin) && (
        <AddProfessor />
      )}

      {isAdd && userAuth.user?.roles.find((val) => val === Rols.secretary) && (
        <AddProfessorSecretary />
      )}

      {!isAdd && userAuth.user?.roles.find((val) => val === Rols.admin) && (
        <UpdateProfessor />
      )}

      {!isAdd && userAuth.user?.roles.find((val) => val === Rols.secretary) && (
        <UpdateProfessorSecretary />
      )}
    </div>
  );
};

export default ValidateRolProfessor;
