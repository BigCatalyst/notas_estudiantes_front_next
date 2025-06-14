/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Rols } from "@/data/NavigationItems";
import { State } from "@/redux/features/authSlice";
import { useSelector } from "react-redux";
import EdicionAulaVirtual from "./EdicionAulaVirtual";
import DetallesAulaVirtual from "./DetallesAulaVirtual";

const ValidateViewsClassRoom = () => {
  const userAuth: State = useSelector((state: any) => state.auth);
  return (
    <div>
      {userAuth.user &&
        userAuth.user?.roles.find(
          (val) => val === Rols.profesor
        ) && <EdicionAulaVirtual />}

      {userAuth.user &&
        userAuth.user?.roles.find((val) => val === Rols.student || val === Rols.secretary || val === Rols.admin ) && (
          <DetallesAulaVirtual />
        )}
    </div>
  );
};

export default ValidateViewsClassRoom;
