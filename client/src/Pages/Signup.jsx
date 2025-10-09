import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/register`, { name, email, password });
  
      if (data.success) {
        localStorage.setItem("token", data.token);
        setAuthToken(data.token);        // <- update axios headers
        setIsLoggedIn(true);
  
        const user = await getUserData();  // <- wait for userData to load
        if (user) navigate("/");            // <- navigate only after userData is ready
        toast.success("Signup successful!");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    }
  };
  
  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={onSubmitHandler}>
        <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <input placeholder="Confirm Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
