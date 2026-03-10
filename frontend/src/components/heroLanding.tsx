import { Link } from "react-router-dom";
import Button from "./button";

const Hero = () => {
  return (
    <>
      <div id="hero">
        <span className="badge success large">
          <i className="fa-solid fa-arrow-trend-up"></i> Take control of your
          spending
        </span>
        <h1>Track every rupee,</h1>
        <h1 style={{ color: "rgb(84, 192, 105)" }}> master your money.</h1>
        <h4 style={{ color: "gray", marginBottom: "60px" }}>
          Take control of your finances by tracking your daily expenses,
          organizing spending categories, and gaining clear insights into where
          your money goes.
        </h4>
        <div>
          <Link to={"/signup"}>
            <Button value="Get Started - It's Free!" isStyle={true} />
          </Link>
          <Link to="/login">
            <Button value="Login" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
