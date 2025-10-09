import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // to track auth status

  // Setup axios defaults
  axios.defaults.withCredentials = true;

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      if (data.success) {
        setUserData(data.userData);
        return data.userData;
      }
       else {
        setUserData(null);
        toast.error(data.message || "Failed to fetch user data");
      }
    } catch (error) {
      setUserData(null);
      toast.error(error.message || "Something went wrong");
    }
  };

  const getAuthState = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      setUserData(null);
      setLoading(false);
      return;
    }

    setAuthToken(token);

    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
      if (data.success) {
        setIsLoggedIn(true);
        await getUserData(); // fetch user info
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserData(null);
      if (!error.response || error.response.status !== 401) {
        toast.error(error.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // Call once on app load
  useEffect(() => {
    getAuthState();
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
        setAuthToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
