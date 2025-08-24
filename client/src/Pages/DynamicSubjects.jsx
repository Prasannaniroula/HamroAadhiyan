import React from "react";
import { Link, useParams } from "react-router-dom";
import subjectData from "../Components/SubjectData";

function DynamicSubjects() {
  const { course, semester } = useParams();

  const courseAliasMap = {
    csit: "csit",
    bit: "bit",
    bba: "bba",
  };

  const normalizedCourse =
    courseAliasMap[course.toLowerCase()] || course.toLowerCase();
  const subjects = subjectData[normalizedCourse]?.[semester] || [];

  const courseFullNames = {
    csit: "Bachelor of Science in Computer Science and Information Technology",
    bit: "Bachelor of Information and Technology",
    bba: "Bachelor of Business Administration",
  };

  return (
    <div>
      {/* Course Title */}
      <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
        <div className=" text-center pt-20 px-6">
          <h1 className="text-4xl font-extrabold uppercase tracking-wide text-gray-800">
            {course}
          </h1>
          <p className="text-pink-600 mt-2 font-medium">
            {courseFullNames[normalizedCourse] || "Unknown Course"}
          </p>
        </div>

        {/* Semester */}
        <h3 className="text-2xl text-center mt-6 pb-12 font-semibold">
          {semester.charAt(0).toUpperCase() + semester.slice(1, 8)}-
          {semester.slice(8)}
        </h3>
      </div>

      {/* Subjects */}
      <div className="grid gap-8  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center p-10">
        {subjects.length > 0 ? (
          subjects.map((subject, index) => (
            <Link to="/">
            <div
              key={index}
              className="group bg-white flex flex-col justify-between items-center text-black border border-zinc-200 p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 w-96"
            >
              <div className="flex flex-col items-center">
                {/* Icon */}
                <div className="text-pink-600 mb-3 group-hover:scale-110 transition-transform"></div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2 text-center">
                  {subject.title}
                </h3>

                {/* Optional short description */}
                <p className="text-sm text-gray-500 text-center">
                  {subject.description || "Explore this subject in detail."}
                </p>
              </div>

              {/* Button */}
              <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full mt-4 transition-colors">
                Read More
              </button>
            </div>
            </Link>
          ))
        ) : (
          <p className="text-red-500 col-span-full">
            No subjects available for {course} - {semester}.
          </p>
        )}
      </div>
    </div>
  );
}

export default DynamicSubjects;
