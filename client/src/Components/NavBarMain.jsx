import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser as faUserRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDown,
  faBars,
  faUser,
  faCircleQuestion,
  faGear,
  faArrowRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../context/AppContext";

export default function NavBarMain() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const { userData, isLoggedIn, loading, logoutUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  if (loading) return null;

  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-between items-center p-5 shadow-2xl bg-white sticky top-0 z-50">
        {/* Logo */}
        <Link to="/">
          <div className="text-xl flex gap-1 font-bold text-pink-600 drop-shadow-lg cursor-pointer">
            Hamro <div className="text-black">Aadhiyan</div>
          </div>
        </Link>

        {/* Hamburger for mobile */}
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setMenuOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:justify-around items-center gap-8">
          <div className="flex gap-8 mt-3 items-center text-md">
            {/* Courses dropdown */}
            <div className="group relative">
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  `flex items-center hover:text-pink-400 ${
                    isActive ? "border-b-3 border-pink-600" : ""
                  }`
                }
              >
                Courses
                <FontAwesomeIcon icon={faAngleDown} className="ml-1" />
              </NavLink>
              <div className="absolute top-full left-0 mt-1 hidden group-hover:flex flex-col bg-white shadow-lg rounded-md z-50 min-w-[200px]">
                <Link to="/courses/csit" className="px-4 py-2 hover:bg-pink-100">
                  BSC.CSIT
                </Link>
                <Link to="/courses/bit" className="px-4 py-2 hover:bg-pink-100">
                  BIT
                </Link>
                <Link to="#" className="px-4 py-2 hover:bg-pink-100">
                  Electrical Engineering
                </Link>
                <Link to="#" className="px-4 py-2 hover:bg-pink-100">
                  Electronics Engineering
                </Link>
                <Link to="#" className="px-4 py-2 hover:bg-pink-100">
                  BSC.Zoology
                </Link>
                <Link to="/courses/bba" className="px-4 py-2 hover:bg-pink-100">
                  BBA
                </Link>
              </div>
            </div>

            {/* Other links */}
            <NavLink to="/notices" className={({ isActive }) =>
              `flex items-center hover:text-pink-400 ${
                isActive ? "border-b-3 border-pink-600" : ""
              }`
            }>
              Notices
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) =>
              `flex items-center hover:text-pink-400 ${
                isActive ? "border-b-3 border-pink-600" : ""
              }`
            }>
              Contact Us
            </NavLink>
            <NavLink to="/ask" className={({ isActive }) =>
              `flex items-center hover:text-pink-400 ${
                isActive ? "border-b-3 border-pink-600" : ""
              }`
            }>
              Ask a Question
            </NavLink>
            <NavLink to="/about" className={({ isActive }) =>
              `flex items-center hover:text-pink-400 ${
                isActive ? "border-b-3 border-pink-600" : ""
              }`
            }>
              About Us
            </NavLink>
          </div>
        </div>

        {/* Desktop User Dropdown */}
        {isLoggedIn && userData ? (
          <div className="hidden md:flex relative group">
          <div className="flex justify-center items-center pr-4 text-md mt-2"> <div className="text-pink-600 font-bold">Welcome</div> , {userData.name}</div>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white font-bold cursor-pointer">
              {userData.name[0].toUpperCase()}
            </div>

            <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50">
              <div className="flex flex-col pt-4">
                {/* Greeting */}
                <div className="px-4 pb-3 border-b border-gray-200">
                  <span className="text-gray-800 font-semibold text-lg">
                  <FontAwesomeIcon icon={faUser} className="px-2" /> {userData.name.split(" ")[0]}
                  </span>
                </div>

                <Link
                  to="/settings"
                  className="px-4 py-3 hover:bg-pink-50 transition text-gray-700 font-medium"
                >
                  <FontAwesomeIcon icon={faGear} className="px-2" />Settings
                </Link>
                <Link
                  to="/help-center"
                  className="px-4 py-3 hover:bg-pink-50 transition text-gray-700 font-medium"
                >
                  <FontAwesomeIcon icon={faCircleQuestion} className="px-2" />Help Center
                </Link>
                {!userData.isAccountVerified && (
                  <Link
                    to="/send-otp"
                    className="px-4 py-3 hover:bg-red-100 transition text-pink-600 font-medium"
                  >
                   <FontAwesomeIcon icon={faXmark} className="px-2" /> Verify Email
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 hover:bg-pink-600 transition text-white font-medium bg-pink-500 rounded-b-xl text-left"
                >
                   <FontAwesomeIcon icon={faArrowRightFromBracket} className="px-2" />Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex gap-6 justify-center items-center text-md">
            <Link to="/login" className="hover:text-pink-400">
              Log In
            </Link>
            <Link to="/signup">
              <button className="bg-pink-600 text-white px-5 py-3 rounded-2xl">
                <FontAwesomeIcon icon={faUserRegular} /> Sign up
              </button>
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-screen max-w-xs bg-white p-6 flex flex-col gap-4 shadow-xl transform transition-transform duration-300 ease-in-out">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl flex gap-1 font-bold text-pink-600 drop-shadow-lg cursor-pointer">
                Hamro <div className="text-black">Aadhiyan</div>
              </div>
              <FontAwesomeIcon
                icon={faXmark}
                className="text-2xl cursor-pointer hover:text-pink-500"
                onClick={() => setMenuOpen(false)}
              />
            </div>

            {/* Courses */}
            <div className="flex flex-col">
              <button
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                className="flex items-center justify-between w-full font-medium text-gray-700 hover:text-pink-500 focus:outline-none"
              >
                Courses
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className={`ml-2 transition-transform duration-200 ${
                    mobileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileDropdownOpen && (
                <div className="flex flex-col ml-4 mt-2 border-l border-gray-200 pl-4 space-y-1">
                  <Link to="/courses/csit" className="py-1 hover:text-pink-500">
                    BSC.CSIT
                  </Link>
                  <Link to="/courses/bit" className="py-1 hover:text-pink-500">
                    BIT
                  </Link>
                  <Link to="#" className="py-1 hover:text-pink-500">
                    Electrical Engineering
                  </Link>
                  <Link to="#" className="py-1 hover:text-pink-500">
                    Electronics Engineering
                  </Link>
                  <Link to="#" className="py-1 hover:text-pink-500">
                    BSC.Zoology
                  </Link>
                  <Link to="/courses/bba" className="py-1 hover:text-pink-500">
                    BBA
                  </Link>
                </div>
              )}
            </div>

            {/* Other Links */}
            <div className="flex flex-col space-y-2">
              <Link to="/notices" className="py-1 hover:text-pink-500">
                Notices
              </Link>
              <Link to="/contact" className="py-1 hover:text-pink-500">
                Contact
              </Link>
              <Link to="/about" className="py-1 hover:text-pink-500">
                About
              </Link>
            </div>

            {/* User Panel */}
            <div className="mt-auto flex flex-col gap-3">
              {isLoggedIn && userData ? (
                <div className="py-4 px-4 rounded-lg bg-gray-100 flex flex-col space-y-2">
                  <div className="text-base font-semibold text-gray-800 px-4">
                    Welcome! {userData.name.split(" ")[0]}
                  </div>
                  <Link
                    to="/settings"
                    className="py-2 px-3 rounded hover:bg-gray-200 text-gray-700 font-medium transition"
                  >
                    <FontAwesomeIcon icon={faGear} className="px-2" />Settings
                  </Link>
                  <Link
                    to="/help-center"
                    className="py-2 px-3 rounded hover:bg-gray-200 text-gray-700 font-medium transition"
                  >
                    <FontAwesomeIcon icon={faCircleQuestion} className="px-2" />Help Center
                  </Link>
                  {!userData.isAccountVerified && (
                    <Link
                      to="/send-otp"
                      className="py-2 px-3 rounded hover:bg-red-100 text-red-600 font-medium transition"
                    >
                      Verify Email
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="py-2 px-3 rounded hover:bg-red-600 text-white bg-red-500 font-medium transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block bg-pink-500 text-white px-4 py-2 rounded-full text-center hover:bg-pink-600 transition duration-200"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Backdrop */}
          <div
            className="flex-1 bg-black/30 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
        </div>
      )}
    </>
  );
}
