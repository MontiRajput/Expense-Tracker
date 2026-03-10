import { Navigate } from "react-router-dom";
import "./layout.css";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return <div className="layout">{children}</div>;
};

export default Layout;
