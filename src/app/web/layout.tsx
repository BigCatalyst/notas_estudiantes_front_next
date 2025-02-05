"use client";

import { AuthProvider } from "@/contexts/AuthContext";



export default function AotrizacionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
     
  return <>Rodeado<AuthProvider>{children}</AuthProvider></>;
}