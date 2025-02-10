/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import NeomorfLoader from "@/components/loader/l3/NeomorfLoader";
import { logout } from "@/redux/features/authSlice";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // const cerrarcecion = async () => {
    //   const res = await ApiService.logout();
    //   console.log(res);
    //   dispatch(logout());
    // };

    // cerrarcecion();

    dispatch(logout());
    redirect("/login");
  }, []);
  return (
    <div>
      <NeomorfLoader />
    </div>
  );
};

export default Logout;
