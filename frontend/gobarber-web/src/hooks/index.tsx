import { AuthProvider } from "./auth";
import { ToastProvider } from "./toast";
import React from "react";


const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);



export default AppProvider;