import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // axios should send cookies automatically
  axios.defaults.withCredentials = true;

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`,{
        withCredentials: true,
      });
      if (data.success) {
        setUserData(data.userData);
        setIsLoggedIn(true);
        return data.userData;
      } else {
        setUserData(null);
        setIsLoggedIn(false);
        toast.dismiss();
        toast.error(data.message || "Failed to fetch user data");
      }
    } catch (error) {
      setUserData(null);
      setIsLoggedIn(false);

      // Check for the specific 'Unauthorized' error
      if (error.response?.status === 401 || error.message.includes('token')) {
          // Log a quiet message for the expected case, or just do nothing
          // console.log("Initial auth check failed, user is logged out.");
      } else {
        toast.dismiss();
          // Display the toast for genuine server or network errors
          toast.error(error.response?.data?.message || error.message || "Something went wrong");
      }
    }
  };

  const logoutUser = async () => {
    try {
      // 1. Call the backend endpoint to clear the HTTP-only cookie
      await axios.post(`${backendUrl}/api/auth/logout`);
    } catch (error) {
      // Optional: Log error if the API call fails, but proceed with local state clear
      console.error("Backend logout failed:", error);
    } finally {
      // 2. Clear frontend state immediately
      setUserData(null);
      setIsLoggedIn(false);
      setLoading(false); // Make sure loading is false after logout
    }
  };

  // Call once on app load
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      await getUserData();
      setLoading(false);
    };
    initAuth();
  }, []);

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
        loading,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
