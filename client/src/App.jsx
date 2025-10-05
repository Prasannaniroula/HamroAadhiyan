import { BrowserRouter, Route, Routes } from "react-router";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBarMain from "./Components/NavBarMain";
import Frontpage from "./Pages/Frontpage";
import Footer from "./Components/Footer";
import SemPageWrapper from "./Components/SempageWrapper";
import DynamicSubjects from "./Pages/DynamicSubjects";
import Contact from "./Pages/ContactUs";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";

export default function App (){
  return(
  <BrowserRouter>
  <ScrolltoTop/>
  <Routes>
    <Route path="/" element={<><NavBarMain/><Frontpage/><Footer/></>} />
    <Route path="/contact" element={<><NavBarMain/><Contact/><Footer/></>} />
    <Route path="/login" element={<><NavBarMain/><Login/><Footer/></>} />
    <Route path="/signup" element={<><NavBarMain/><Signup/><Footer/></>} />
    <Route path="/:course" element={<><NavBarMain/><SemPageWrapper/><Footer/></>} />
    <Route path="/:course/:semester" element={<><NavBarMain/><DynamicSubjects/><Footer/></>}/>
  </Routes>
  </BrowserRouter>
  )
}

function ScrolltoTop(){
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, [pathname]);
  return null;
}