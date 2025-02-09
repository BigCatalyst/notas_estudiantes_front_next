import NavigationDashboard from "@/components/dashboard/layout/NavigationDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s | Dashboard" },
  description: "Dashboard",
};

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavigationDashboard>{children}</NavigationDashboard>
    </>
  );
};

export default DashBoardLayout;
