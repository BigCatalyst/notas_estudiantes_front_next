/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const state = useSelector((state: any) => state.auth);

  console.log(state);

  return <div>Dashboard</div>;
};

export default Dashboard;
