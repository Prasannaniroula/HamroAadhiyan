import React, { useState } from "react";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setMessage("Please enter a valid 6-digit OTP.");
      return;
    }

    // TODO: Replace with actual API call to verify OTP
    // axios.post('/api/verify-email', { otp }).then(...)

    setMessage("Email verified successfully!");
    setOtp(""); // Reset input
  };

  const handleResend = () => {
    // TODO: Replace with actual API call to resend OTP
    setMessage("A new OTP has been sent to your email.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 via-white to-pink-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Verify Your Email</h1>
        <p className="text-gray-600 mb-6">
          We have sent a 6-digit verification code to your email. Enter it below to activate your account.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit code"
            className="p-4 rounded-xl bg-pink-50 focus:bg-white focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-inner text-center text-lg"
            maxLength={6}
            required
          />

          <button
            type="submit"
            className="py-3 bg-gradient-to-r from-pink-500 to-pink-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            Verify Email
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}

        <button
          onClick={handleResend}
          className="mt-6 text-pink-600 hover:text-pink-700 font-semibold"
        >
          Resend Code
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
