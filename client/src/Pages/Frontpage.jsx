import React from "react";
import { Link } from "react-router-dom";
import Icon from "../components/appIcon.jsx";

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
        <p className="text-xl text-center mb-10">
          Choose a course you are from
        </p>

        <div className="flex flex-wrap justify-center items-stretch gap-6 w-full lg:gap-30 ">
          <Course imglink="Bsccsit.png" head="BSc.CSIT" link="/csit" />
          {/* Add more if needed */}
          <Course imglink="bbatu.gif" head="BBA" link="/bba" />
          <Course imglink="bittu.gif" head="BIT" link="/bit" />
        </div>
      </section>

      {/* Why Learn Section */}
      <section className="bg-pink-50 py-10 w-screen">
        <h2 className="text-5xl font-bold text-center mb-4">
          Why Learn with <span className="text-pink-400">Hamro Aadhiyan </span>{" "}
          ?
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto text-center leading-relaxed">
          Discover the advantages that make us the preferred choice for
          thousands of bachelor students across Nepal.
        </p>

        <div className="grid grid-rows-3 md:grid-cols-3 sm:grid-cols-1 px-20 gap-10 pt-20">
          {/* Card 1 */}
          <Card
            icon="ClipboardCheck"
            bgColor="bg-blue-50"
             color="text-blue-600"
            head="Past year solutions"
            desc="Complete solutions of Past Year Question banks of every semester with related courses."
          />
          {/* Card 2 */}
          <Card
            icon="BookOpen"
            bgColor="bg-green-50"
             color="text-green-600"
            head="Book PDF"
            desc="All the book pdf of all the semesters of related courses will be available here."
          />
          {/* Card 3 */}
          <Card
            icon="ClipboardList"
            bgColor="bg-purple-50"
           color="text-purple-600"
            head="Notes"
            desc="Complete Notes of all semester related courses maintained by the Expert will be provided here."
          />
          {/* Card 4 */}
          <Card
            icon="BellRing"
            color="text-orange-600"
            bgColor="bg-orange-50"
            head="Notices"
            desc=" All the up-to-date notices of related semesters are provided here."
          />
          {/* card 5 */}
          <Card
            icon="MonitorPlay"
            color="text-pink-600"
            bgColor="bg-pink-50"
            head="Videos Reference"
            desc="Videos of related topics will be provided to clear the doubts."
          />
          {/* card 6 */}
          <Card
            icon="MessageCircleQuestionMark"
            bgColor="bg-indigo-50"
            color="text-indigo-600"
            head="Ask a question"
            desc="Any questions can be asked related to the courses that are available in Hamro Aadhiyan."
          />
        </div>
      </section>
    </div>
  );
}

function Card({ icon, head, desc, bgColor, color }) {
  return (
      <div
        className="group bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 hover:border-pink-200 hover:shadow-xl transition-all duration-300 shadow-lg"
      >
        <div className={`w-14 h-14 rounded-xl ${bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <Icon name={icon} size={28} className={color} />
        </div>
        
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
          {head}
        </h3>
        
        <p className="text-gray-600 leading-relaxed">
          {desc}
        </p>
      </div>

  );
}
function Course({ imglink, head, link }) {
  return (
    <div className="flex items-center gap-4 bg-gray-400 text-white text-xl p-2 rounded-2xl shadow-2xl max-w-[300px] w-full mt-5 hover:bg-gray-500 transition-all">
      <img src={imglink} alt="image" className="max-w-[60%] rounded-xl" />
      <Link to={link} className="cursor-pointer text-lg p-1">
        {head}
      </Link>
    </div>
  );
}

export default Index;
