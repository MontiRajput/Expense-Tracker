import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};
export default logout;
