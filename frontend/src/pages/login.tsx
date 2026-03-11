import "./signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    const response = await fetch(
      "https://expense-tracker-2-z4xh.onrender.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      setError(data.message || "Login failed");
      setTimeout(() => {
        setError("");
      }, 4000);
      return;
    }

    localStorage.setItem("token", data.access_token);

    navigate("/dashboard");
  };
  return (
    <div>
      {error && (
        <div role="alert" className="alert" data-variant="error">
          <strong>Error!</strong> {error}
        </div>
      )}
      <form className="form" onSubmit={handleSubmit}>
        <label data-field>
          Email
          <input
            type="email"
            placeholder="you@example.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label data-field>
          Password
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
