import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Laptop, Briefcase, Zap, Cpu, FlaskConical } from "lucide-react"; 

function CoursesPage() {
  const courses = [
    { id: 1, name: "B.Sc. CSIT", slug: "csit", description: "Computer Science & Information Technology", icon: <Laptop className="w-10 h-10 text-pink-600" /> },
    { id: 2, name: "BIT", slug: "bit", description: "Bachelor of Information Technology", icon: <BookOpen className="w-10 h-10 text-indigo-600" /> },
    { id: 3, name: "BBA", slug: "bba", description: "Bachelor of Business Administration", icon: <Briefcase className="w-10 h-10 text-green-600" /> },
    { id: 4, name: "Electrical Engineering", slug: "ee", description: "Bachelor in Electrical Engineering", icon: <Zap className="w-10 h-10 text-yellow-500" /> },
    { id: 5, name: "Electronics Engineering", slug: "ece", description: "Bachelor in Electronics & Communication", icon: <Cpu className="w-10 h-10 text-blue-600" /> },
    { id: 6, name: "B.Sc. Zoology", slug: "zoology", description: "Bachelor in Zoology", icon: <FlaskConical className="w-10 h-10 text-purple-600" /> }
  ];

  return (
    <div className="bg-gradient-to-b from-pink-50 via-white to-pink-50 min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-12 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 drop-shadow-lg">
          Explore Our Courses
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Choose from a variety of undergraduate programs and explore semester-wise subjects, notes, and resources tailored for you.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-16">
        {courses.map((course) => (
          <Link
            key={course.id}
            to={`/courses/${course.slug}`}
            className="group p-8 rounded-2xl shadow-lg bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">{course.icon}</div>
              <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
                {course.name}
              </h2>
              <p className="text-gray-500 mt-2">{course.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;
