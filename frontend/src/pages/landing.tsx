import Card from "../components/card";
import Hero from "../components/heroLanding";
import "./landing.css";

const LandingPage = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Hero />
      <div id="card-container">
        <Card
          className="fa-solid fa-arrow-trend-up"
          description="Filter expenses by category and date range effortlessly."
          title="Track & Filter"
        />
        <Card
          className="fa-solid fa-chart-simple"
          description="See monthly spending broken down by category instantly."
          title="Smart Summary"
        />
        <Card
          className="fa-solid fa-wallet"
          description="All your expense data stays private and secure."
          title="Budget Control"
        />
      </div>
    </div>
  );
};

export default LandingPage;
