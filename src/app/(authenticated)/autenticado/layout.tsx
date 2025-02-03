// src/app/dashboard/layout.tsx

import ProtectedLayout from "@/components/ProtectedLayout";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedLayout>
      <div>
        <h1>Dashboard Layout</h1>
        {/* Contenido común para todas las páginas del dashboard */}
        {children}
      </div>
    </ProtectedLayout>
  );
}