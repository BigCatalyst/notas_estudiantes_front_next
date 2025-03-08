/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import DashboardContent from "@/components/dashboard/dashboard";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const state = useSelector((state: any) => state.auth);

  console.log(state);

  return <DashboardContent />;
};

export default Dashboard;
