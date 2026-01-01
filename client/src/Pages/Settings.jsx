import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaUserCog, FaLock, FaEnvelope, FaMobileAlt, FaTrash, FaUserEdit} from "react-icons/fa";

function Settings() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10 px-4 md:px-0">
      {/* Back to Homepage */}
      <div className="w-full max-w-6xl mb-6">
        <a
          href="/"
          className="flex items-center text-red-600 font-semibold hover:text-red-500"
        >
          <FaArrowLeft className="mr-2" /> Back to Homepage
        </a>
      </div>

      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-10">
        {/* Sidebar */}
        
        <div className="flex md:flex-col flex-row md:w-56 w-full gap-4 md:gap-4 mb-4 md:mb-0">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 p-3 rounded transition border-b-2 md:border-b-0 md:border-l-4 ${
              activeTab === "overview"
                ? "border-black font-semibold"
                : "border-transparent hover:border-black"
            }`}
          >
            <FaUserCog /> Overview
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 p-3 rounded transition border-b-2 md:border-b-0 md:border-l-4 ${
              activeTab === "security"
                ? "border-black font-semibold"
                : "border-transparent hover:border-black"
            }`}
          >
            <FaLock /> Security
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-5xl font-bold">Overview</h2>
              <h3 className="text-xl  mb-3 flex items-center gap-2">
               Account Details
                </h3>
              
              <div className="mb-6 bg-white p-4 border border-zinc-300 rounded-2xl">
                <div className="flex flex-col">
                <Link to="/accountsettings"className="p-4 text-left text-[18px] font-bold border-b border-zinc-300 hover:bg-zinc-200 ">
                    <div className="flex items-center gap-2 px-2">
                <FaUserCog className="w-6 h-6" />  Account Settings
                </div>
                  </Link>
                  <button className="p-4 text-left text-[18px] font-bold border-b border-zinc-300 hover:bg-zinc-200 ">
                  <div className="flex items-center gap-2 px-2">
                   <FaLock className="w-6 h-5" />  Update Password
                   </div>
                  </button>
                  <button className="p-4 text-left text-[18px] font-bold  hover:bg-zinc-200">
                  <div className="flex items-center px-2 gap-2">
                    <FaUserEdit className="w-6 h-6" />  Edit Profile
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <h2 className="text-5xl font-bold">Security</h2>

              <div>
                <h3 className="text-xl  mb-3 flex items-center gap-2">
                   Security Options
                </h3>
                <div className="flex flex-col gap-2 bg-white p-4 border border-zinc-300 rounded-2xl">
                <Link className="p-4 text-left text-[18px] font-bold border-b border-zinc-300 hover:bg-zinc-200 ">
                  <div className="flex items-center gap-2 px-2">
                   <FaLock className="w-6 h-5" />  Change Password
                   </div>
                  </Link>
                  <Link to="/settings/updatemail" className="p-4 text-left text-[18px] font-bold border-b border-zinc-300 hover:bg-zinc-200 ">
                  <div className="flex items-center gap-2 px-2">
                   <FaEnvelope className="w-6 h-5" />  Update Email
                   </div>
                  </Link>
                  <Link to="/settings/updatemob" className="p-4 text-left text-[18px] font-bold border-b border-zinc-300 hover:bg-zinc-200 ">
                  <div className="flex items-center gap-2 px-2">
                   <FaMobileAlt className="w-6 h-6" />  Update Mobile Number
                   </div>
                  </Link>
                  <Link to="/settings/deleteacc" className="p-4 text-left text-[18px] font-bold text-red-500 hover:bg-red-500  hover:text-white">
                  <div className="flex items-center gap-2 px-2">
                   <FaTrash className="w-6 h-5" />  Delete Account
                   </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
