// src/pages/SocialCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SocialCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Save token in localStorage or send to cookie
      localStorage.setItem("token", token);
      // Navigate to dashboard or home page
      navigate("/");
    } else {
      alert("Login failed. No token received.");
      navigate("/login");
    }
  }, []);

  return <div>Logging you in...</div>;
}
