import ProtectedRoutes from "@/components/dashboard/layout/ProtectedRoutes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "ESBU_M94", template: "%s | Dashboard" },
  description: "Dashboard",
};

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProtectedRoutes>{children}</ProtectedRoutes>
    </>
  );
};

export default DashBoardLayout;
