import "./signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
    };

    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.message || "Signup failed");
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
          Name
          <input
            type="text"
            placeholder="Enter your name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </label>

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
            aria-describedby="password-hint"
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$"
            onChange={(e) => setPassword(e.target.value)}
          />
          <small id="password-hint" data-hint>
            Password must be at least 8 characters long and include a mix of
            uppercase letters, lowercase letters, numbers, and special
            characters.
          </small>
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
