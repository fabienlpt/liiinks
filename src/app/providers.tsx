import { AuthContextProvider } from "@/lib/AuthContext";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
