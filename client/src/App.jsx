import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import Courses from "./Pages/Courses";
import AboutUs from "./Pages/AboutUs";
import AskQuestion from "./Pages/AskAQuestion";

export default function App (){
  return(
  <BrowserRouter>
  <ScrolltoTop/>
  <Routes>
    //courses routes
    <Route path="/courses" element={<><NavBarMain/><Courses/><Footer/></>} />
    <Route path="/courses/:course" element={<><NavBarMain/><SemPageWrapper/><Footer/></>} />
    <Route path="/courses/:course/:semester" element={<><NavBarMain/><DynamicSubjects/><Footer/></>}/>

    // main routes
    <Route path="/" element={<><NavBarMain/><Frontpage/><Footer/></>} />
    //contact us route
    <Route path="/contact" element={<><NavBarMain/><Contact/><Footer/></>} />
    // auth routes
    <Route path="/login" element={<><NavBarMain/><Login/><Footer/></>} />
    <Route path="/signup" element={<><NavBarMain/><Signup/><Footer/></>} />

    //about routes
    <Route path="/about" element={<><NavBarMain/><AboutUs/><Footer/></>} />
    // ask a question route
    <Route path="/ask" element={<><NavBarMain/><AskQuestion/><Footer/></>} />
    //notices
    <Route path="/notices" element={<><NavBarMain/><h1>Notices Page</h1><Footer/></>} />

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