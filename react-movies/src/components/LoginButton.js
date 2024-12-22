import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const LoginButton = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // 使用弹窗进行登录
      const result = await signInWithPopup(auth, provider);

      // 获取用户信息
      const user = result.user;
      console.log("User Info:", user);
      alert(`Welcome ${user.displayName}!`);
    } catch (error) {
      console.error("Login Error:", error.message);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <button onClick={handleLogin} style={{ padding: "10px", backgroundColor: "#4285F4", color: "#fff", border: "none", borderRadius: "5px" }}>
      Login with Google
    </button>
  );
};

export default LoginButton;
