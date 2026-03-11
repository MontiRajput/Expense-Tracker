import { Link, useNavigate } from "react-router-dom";
import Button from "./button.tsx";
import "./navbar.css";
import { useContext } from "react";
import { GlobalContext } from "../context/globalProvider.tsx";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const { user } = useContext(GlobalContext) as any;

  return (
    <nav id="navbar">
      <div id="logo-container">
        <div id="logo">
          <img src="/assets/logo.svg" alt="logo" style={{ width: "40px" }} />
        </div>
        <h3>Expense Tracker</h3>
      </div>

      {user ? (
        <Button value="Logout" isStyle={true} onClick={logout} />
      ) : (
        <div className="btns">
          <Link to="/login">
            <Button value="Login" isStyle={true} />
          </Link>

          <Link to="/signup">
            <Button value="Signup" />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
