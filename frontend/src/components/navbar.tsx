import { Link } from "react-router";
import Button from "./button.tsx";
import "./navbar.css";
const navbar = () => {
  const token = localStorage.getItem("token");
  return (
    <nav id="navbar">
      <div id="logo-container">
        <div id="logo">
          <img src="/assets/logo.svg" alt="logo" style={{ width: "40px" }} />
        </div>
        <h3>Expense Tracker</h3>
      </div>
      {!token && (
        <div className="btns">
          <Link to="/login">
            <Button value="Login" isStyle={true} />
          </Link>
          <Link to={"/signup"}>
            <Button value="Signup" />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default navbar;
