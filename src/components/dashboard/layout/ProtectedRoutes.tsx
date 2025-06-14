"use client";
import GeneralLoader from "@/components/loader/GeneralLoader";
import { useCheckPermission } from "@/hooks/useCheckPermission";
import NavigationDashboard from "./NavigationDashboard";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useCheckPermission();
  if (loading) {
    return <GeneralLoader />;
  }
  return <NavigationDashboard>{children}</NavigationDashboard>;
};

export default ProtectedRoutes;
