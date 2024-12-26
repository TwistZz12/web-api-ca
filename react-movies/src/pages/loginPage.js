import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api/moviesApi";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigate("/"); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await register(username, password);
      alert(response.msg); 
      setIsRegisterMode(false); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{isRegisterMode ? "Register" : "Login"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />
      {isRegisterMode ? (
        <button onClick={handleRegister} style={{ marginRight: "10px" }}>
          Register
        </button>
      ) : (
        <button onClick={handleLogin} style={{ marginRight: "10px" }}>
          Login
        </button>
      )}
      <button onClick={() => setIsRegisterMode(!isRegisterMode)}>
        {isRegisterMode ? "Switch to Login" : "Switch to Register"}
      </button>
    </div>
  );
};

export default LoginPage;
