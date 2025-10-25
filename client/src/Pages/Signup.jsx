import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const { backendUrl, setIsLoggedIn, getUserData, setAuthToken } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/register`, {name, email, password });
      if (data.success) {
        // Save token
        localStorage.setItem("token", data.token);
        setAuthToken(data.token);

        setIsLoggedIn(true);
        await getUserData(); // fetch user info
        toast.success("Login successful!");
        navigate("/"); // navigate only after userData is fetched
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error(error.message || "Something went wrong");
      }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-pink-200 p-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Sign Up
      </h2>

      <form className="space-y-4" onSubmit={onSubmitHandler}>
        <input
          onChange={e => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-pink-300 outline-none"
        />
        <input
          onChange={e => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-pink-300 outline-none"
        />

        <div className="relative">
          <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-pink-300 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="relative">
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-pink-300 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold transition duration-200"
        >
          Sign Up
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-3 text-gray-500 text-sm">OR</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* Social Signup */}
      <div className="space-y-3">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Sign Up with Google
        </button>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
          Sign Up with Facebook
        </button>
      </div>

      <p className="mt-6 text-center text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-pink-600 font-semibold hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  </div>
  );
}
