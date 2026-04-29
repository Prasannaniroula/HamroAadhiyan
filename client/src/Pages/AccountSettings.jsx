import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";
import { Camera } from "lucide-react";

export default function AccountSettings() {
  const { userData, setUserData } = useContext(AppContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(""); // preview URL
  const [file, setFile] = useState(null); // actual File object
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);

  // Load user data
  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setPhoto(userData.photo || userData.avatar || "");
      setEmail(userData.email || "");
      setIsUserLoading(false);
    }
  }, [userData]);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPhoto(URL.createObjectURL(selectedFile));
  };

  // Save changes
  const handleSave = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      if (file) formData.append("photo", file);

      const { data } = await axios.put(
        `${backendUrl}/api/user/update`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setUserData(data.user);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      toast.dismiss();
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl p-6 sm:p-8 transition-all duration-300">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-blue-600">
          Account Settings
        </h2>

        {isUserLoading ? (
          <div className="animate-pulse text-center text-gray-400">
            Loading user details...
          </div>
        ) : (
          <>
            {/* Profile Photo */}
            <div className="flex flex-col items-center mb-6 relative">
              <div className="relative group">
                <img
                  src={photo || "/default-avatar.png"}
                  alt="Profile"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-blue-100 object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                <label className="absolute bottom-1 right-1 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 shadow-md">
                  <Camera className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Tap the camera icon to change photo
              </p>
            </div>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full border border-gray-200 p-2 sm:p-3 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed text-sm sm:text-base"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={loading}
              className={`w-full py-2.5 sm:py-3 font-semibold rounded-lg text-white transition duration-200 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-md"
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
