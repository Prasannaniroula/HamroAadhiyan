import React from "react";
import { useContext } from "react";
import { Users, BookOpen, HeartHandshake } from "lucide-react";
import { AppContext } from "../context/AppContext";

function AboutUs() {
  const { isLoggedIn } = useContext(AppContext);
  return (
    <div className="bg-gradient-to-b from-white via-pink-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 drop-shadow-lg">
          About HamroAadhiyan
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          HamroAadhiyan is a learning platform built for students, by students. 
          Our mission is to make education resources accessible, well-organized, 
          and engaging for learners across Nepal.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        <div className="p-8 bg-white rounded-2xl shadow-md text-center hover:shadow-lg transition">
          <BookOpen className="w-12 h-12 mx-auto text-pink-600 mb-4" />
          <h2 className="text-xl font-semibold">Our Mission</h2>
          <p className="text-gray-600 mt-2">
            To provide students with easy access to semester-wise notes, 
            question banks, and study materials to help them succeed academically.
          </p>
        </div>

        <div className="p-8 bg-white rounded-2xl shadow-md text-center hover:shadow-lg transition">
          <HeartHandshake className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
          <h2 className="text-xl font-semibold">Our Vision</h2>
          <p className="text-gray-600 mt-2">
            To create a collaborative digital education space where learners 
            and teachers can share knowledge and grow together.
          </p>
        </div>

        <div className="p-8 bg-white rounded-2xl shadow-md text-center hover:shadow-lg transition">
          <Users className="w-12 h-12 mx-auto text-green-600 mb-4" />
          <h2 className="text-xl font-semibold">Our Community</h2>
          <p className="text-gray-600 mt-2">
            We believe learning is best when shared. 
            Our platform is designed to support peer-to-peer collaboration 
            and community-driven learning.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Meet Our Team</h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          HamroAadhiyan is built and maintained by a passionate group of 
          students, educators, and developers who care about accessible learning.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8">
          {/* Team Member Card */}
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-xl transition">
            <img
              src="/prasanna.JPG"
              alt="Team Member"
              className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-pink-200"
            />
            <h3 className="mt-4 text-lg font-semibold">Prasanna Niroula</h3>
            <p className="text-gray-500">Founder / Developer</p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-xl transition">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-pink-200"
            />
            <h3 className="mt-4 text-lg font-semibold">Bhagwati pd. thakur</h3>
            <p className="text-gray-500">Co-founder/ Content-Creator</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      {isLoggedIn ? null : (<div className="text-center py-16 bg-pink-600 text-white">
        <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
        <p className="mb-6 text-lg">Be part of the HamroAadhiyan community and explore a new way of learning.</p>
        <a
          href="/signup"
          className="px-6 py-3 bg-white text-pink-600 font-semibold rounded-2xl shadow hover:bg-gray-100"
        >
          Get Started
        </a>
      </div>
    )}
    </div>  
  );
}

export default AboutUs;
