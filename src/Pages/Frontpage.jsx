import React from 'react'
import { Link } from 'react-router-dom'

function Index() {
  return (
    <div>

      {/* Hero Section */}
      <section className="h-screen w-screen pt-20 pl-10 pb-10 bg-[url('/front.jpg')] bg-cover bg-no-repeat">
        <div className="text-2xl text-pink-400 mb-6">
          Learning is a journey, not a destination. So, enjoy while learning.
        </div>
        <h1 className="text-5xl font-bold leading-snug">
          The Best <br />
          <span className="text-pink-400">E-Learning Platform</span> <br />
          For Bachelor Students
        </h1>
        <p className="text-2xl mt-8">
          Complete resources to help you guide through your Bachelor's Degree
        </p>
      </section>

      {/* Courses Section */}
      <section className="pt-16 px-10 pb-20 lg:h-screen">
        <h2 className="text-3xl font-bold text-center">Courses</h2>
        <p className="text-xl text-center mb-10">Choose a course you are from</p>

        <div className="flex flex-wrap justify-center items-stretch gap-6 w-full lg:gap-30 ">
          <Course imglink="Bsccsit.png" head="BSc.CSIT" link="/csit" />
          {/* Add more if needed */}
          <Course imglink="bbatu.gif" head="BBA" link="/bba"/>
          <Course imglink="bittu.gif" head="BIT" link="/bit"/>
         
        </div>
      </section>

      {/* Why Learn Section */}
      <section className="bg-pink-50 py-10 w-screen lg:h-screen">
        <h2 className="text-3xl font-bold text-center mb-4">
          Why Learn with <span className="text-pink-400">Hamro</span> Aadhiyan
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center mb-10">
          Complete Notes, Past Year Question Banks With Solutions, Instant notices from trusted websites
        </p>

        <div className="flex flex-wrap justify-center items-start gap-10 px-10">
          {/* Card 1 */}
          <Card head="Past year solutions" desc="Complete solutions of Past Year Question banks of every semester with related courses."/>
          {/* Card 2 */}
          <Card head="Book PDF" desc="All the book pdf of all the semesters of related courses will be available here."/>
          {/* Card 3 */}
            <Card head="Notes" desc="Complete Notes of all semester related courses maintained by the Expert will be provided here."/>
          {/* Card 4 */}
          <Card head ="Notices" desc = " All the up-to-date notices of related semesters are provided here."/>
          {/* card 5 */}
          <Card head ="Videos Reference" desc = "Videos of related topics will be provided to clear the doubts."/>
          {/* card 6 */}
         <Card head ="Ask a question" desc = "Any questions can be asked related to the courses that are available in Hamro Aadhiyan."/>

        </div>
      </section>
    </div>
  );
}

function Card({head,desc}){
  return(
  <div className="bg-white text-black text-xl p-6 rounded-2xl shadow-2xl max-w-[400px] w-full h-50 flex flex-col justify-center mt-5 text-center md:">
  <p className="text-base text-center">
    <Link to="#" className="text-xl font-semibold block mb-2 text-pink-500">{head}</Link>
    <p className='text-lg'>{desc}</p>
  </p>
</div>
)}
function Course({imglink,head,link}){
  return(
  <div className="flex items-center gap-4 bg-gray-400 text-white text-xl p-2 rounded-2xl shadow-2xl max-w-[300px] w-full mt-5 hover:bg-gray-500 transition-all">
            <img src={imglink} alt="image" className="max-w-[60%] rounded-xl" />
            <Link to={link} className="cursor-pointer text-lg p-1">{head}</Link>
          </div> )
}

export default Index;
