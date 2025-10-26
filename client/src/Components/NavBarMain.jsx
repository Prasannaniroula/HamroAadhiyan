import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../context/AppContext';

export default function NavBarMain() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const { userData, isLoggedIn, loading, setIsLoggedIn, setUserData ,logoutUser} = useContext(AppContext);
  const navigate = useNavigate();

 const handleLogout = async () => {
    await logoutUser();
    navigate('/');

 }


  if (loading) return null; // show spinner if you want

  return (
    <>
      <nav className='flex justify-between items-center p-5 shadow-2xl bg-white sticky top-0 z-50'>
        {/* Logo */}
        <Link to="/">
          <div className='text-xl flex gap-1 font-bold text-pink-600 drop-shadow-lg cursor-pointer'>
            Hamro <div className='text-black'>Aadhiyan</div>
          </div>
        </Link>

        {/* Hamburger icon (mobile only) */}
        <div className='md:hidden text-2xl cursor-pointer' onClick={() => setMenuOpen(true)}>
          <FontAwesomeIcon icon={faBars} />
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex md:justify-around items-center gap-8'>
          <div className='flex gap-8 mt-3 items-center text-md'>
            {/* Dropdown: Desktop Hover */}
            <div className="group relative">
              <NavLink to="/courses" className={({isActive})=>`flex items-center hover:text-pink-400 ${isActive ? "border-b-3 border-pink-600": ""}`}>
                Courses
                <FontAwesomeIcon icon={faAngleDown} className="ml-1" />
              </NavLink>
              <div className="absolute top-full left-0 mt-1 hidden group-hover:flex flex-col bg-white shadow-lg rounded-md z-50 min-w-[200px]">
                <Link to="/courses/csit" className="px-4 py-2 hover:bg-pink-100">BSC.CSIT</Link>
                <Link to="/courses/bit" className="px-4 py-2 hover:bg-pink-100">BIT</Link>
                <Link to="#" className="px-4 py-2 hover:bg-pink-100">Electrical Engineering</Link>
                <Link to="#" className="px-4 py-2 hover:bg-pink-100">Electronics Engineering</Link>
                <Link to="#" className="px-4 py-2 hover:bg-pink-100">BSC.Zoology</Link>
                <Link to="/courses/bba" className="px-4 py-2 hover:bg-pink-100">BBA</Link>
              </div>
            </div>
             
            <NavLink to="/notices" className={({isActive})=>`flex items-center hover:text-pink-400 ${isActive ? "border-b-3 border-pink-600": ""}`}>Notices</NavLink>
            <NavLink to="/contact" className={({isActive})=>`flex items-center hover:text-pink-400 ${isActive ? "border-b-3 border-pink-600": ""}`}>Contact Us</NavLink>
            <NavLink to="/ask" className={({isActive})=>`flex items-center hover:text-pink-400 ${isActive ? "border-b-3 border-pink-600": ""}`}>Ask a Question</NavLink>
            <NavLink to="/about" className={({isActive})=>`flex items-center hover:text-pink-400 ${isActive ? "border-b-3 border-pink-600": ""}`}>About us</NavLink>
          </div>
        </div>

        {/* Desktop User / Auth Links */}
        {isLoggedIn && userData ? (
          <div className='hidden md:flex w-8 h-8 justify-center items-center rounded-full bg-black text-white relative group'>
            {userData.name[0].toUpperCase()}
            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
              <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
                {!userData.isAccountVerified && <Link to="/send-otp"> <li className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li></Link>}
                <li onClick={handleLogout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>LogOut</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className='hidden md:flex gap-6 justify-center items-center text-md'>
            <Link to="/login" className='hover:text-pink-400'>Log In</Link>
            <Link to="/signup">
              <button className='bg-pink-600 text-white px-5 py-3 rounded-2xl'>
                <FontAwesomeIcon icon={faUserRegular} /> Sign up
              </button>
            </Link> 
          </div>
        )}
      </nav>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-3/5 bg-white p-6 flex flex-col gap-4 shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">Menu</span>
              <FontAwesomeIcon icon={faXmark} className="text-2xl cursor-pointer" onClick={() => setMenuOpen(false)} />
            </div>

            {/* Mobile Dropdown: Courses */}
            <button onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)} className="flex items-center justify-between text-left font-medium">
              Courses
              <FontAwesomeIcon icon={faAngleDown} className={`ml-2 transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileDropdownOpen && (
              <div className="flex flex-col ml-4 border-l pl-4">
                <Link to="/courses/csit" className="py-1 hover:text-pink-500">BSC.CSIT</Link>
                <Link to="/courses/bit" className="py-1 hover:text-pink-500">BIT</Link>
                <Link to="#" className="py-1 hover:text-pink-500">Electrical Engineering</Link>
                <Link to="#" className="py-1 hover:text-pink-500">Electronics Engineering</Link>
                <Link to="#" className="py-1 hover:text-pink-500">BSC.Zoology</Link>
                <Link to="/courses/bba" className="py-1 hover:text-pink-500">BBA</Link>
              </div>
            )}

            {/* Other Links */}
            <Link to="/notices" className="py-1 hover:text-pink-500">Notices</Link>
            <Link to="/contact" className="py-1 hover:text-pink-500">Contact</Link>
            <Link to="/about" className="py-1 hover:text-pink-500">About</Link>

            {/* Login / Welcome */}
            <div className="mt-4">
              {isLoggedIn && userData ? (
                <div className="py-2 px-4 rounded bg-gray-100 text-sm flex justify-between items-center">
                  <span>Welcome, {userData.name.split(' ')[0]}</span>
                  {!userData.isAccountVerified && <Link to="/send-otp"> <div className='w-30 text-sm text-red-500 ml-2'>Verify-email</div></Link>}
                  <button onClick={handleLogout} className="text-sm text-red-500 ml-1">Logout</button>
                </div>
              ) : (
                <Link to="/login" className="block bg-pink-500 text-white px-4 py-2 rounded-full text-center hover:bg-pink-600">Login</Link>
              )}
            </div>
          </div>
          <div className="w-2/5 bg-black/30 backdrop-blur-sm" onClick={() => setMenuOpen(false)}></div>
        </div>
      )}
    </>
  );
}
