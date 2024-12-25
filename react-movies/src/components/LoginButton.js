import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const LoginButton = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      const idToken = await result.user.getIdToken();
      console.log("Firebase ID Token:", idToken);

      const response = await fetch("http://localhost:8080/api/users/login-with-google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate with server");
      }

      const data = await response.json();
      console.log("JWT Token from Server:", data.token);

      window.localStorage.setItem("token", data.token);

      alert(`Welcome ${result.user.displayName}!`);
    } catch (error) {
      console.error("Login Error:", error.message);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handleLogin}
      style={{
        padding: "10px",
        backgroundColor: "#4285F4",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
      }}
    >
      Login with Google
    </button>
  );
};

export default LoginButton;
