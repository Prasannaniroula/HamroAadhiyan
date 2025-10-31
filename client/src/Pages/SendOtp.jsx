import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router";

export default function SendOtp() {
  const [loading, setLoading] = useState(false);
  const { userData, backendUrl, } = useContext(AppContext);
  const navigate = useNavigate();


  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading user data...</p>
      </div>
    );
  }

  function maskEmail(email) {
    const [name, domain] = email.split("@");
    if (!name || !domain) return email; // fallback

    const nameLength = name.length;

    // If very short name, just show first letter
    if (nameLength <= 2) {
      return `${name[0]}*${"*@*".repeat(1)}@${domain}`;
    }

    // Show first 3 and last 2 characters (adjust if name is too short)
    const firstChars = name.slice(0, Math.min(3, nameLength));
    const lastChars = nameLength > 5 ? name.slice(-2) : name.slice(-1);

    const middleLength = nameLength - firstChars.length - lastChars.length;
    const maskedMiddle = "*".repeat(middleLength);

    return `${firstChars}${maskedMiddle}${lastChars}@${domain}`;
  }

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const email = userData.email;
  
    try {
      setLoading(true);
  
      const { data } = await axios.post(`${backendUrl}/api/auth/send-otp`, {
        email,
        purpose: "verify",
      });
  
      // ✅ Only show success if backend confirms
      if (data.success) {
        toast.success(data.message || "OTP sent successfully!");
        navigate("/verify");
      } else {
        toast.dismiss();
        toast.error(data.message || "Failed to send OTP");
      }
  
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">
          Send OTP
        </h2>
        <p>
          We are sending your OTP to the registered <br />
          <b>E-mail</b>: {maskEmail(userData.email)} receive a (OTP).
        </p>

        <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
          <button
            type="submit"
            disabled={loading}
            className="py-3 bg-gradient-to-r from-pink-500 to-pink-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 mt-5"
          >{loading ? "Sending..." : "Send OTP"} </button>
        </form>
        </div>
      </div>
  );
}
