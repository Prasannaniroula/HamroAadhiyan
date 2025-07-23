import React from 'react';
import { useParams } from 'react-router-dom';
import subjectData from '../Components/SubjectData';

function DynamicSubjects() {
  const { course, semester } = useParams();

  const courseAliasMap = {
    csit: "csit",
    bit: "bit",
    bba: "bba",
  };

  const normalizedCourse = courseAliasMap[course.toLowerCase()] || course.toLowerCase();
  const subjects = subjectData[normalizedCourse]?.[semester] || [];

  const courseFullNames = {
    csit: "Bachelor of Science in Computer Science and Information Technology",
    bit: "Bachelor of Information and Technology",
    bba: "Bachelor of Business Administration",
  };

  return (
    <>
      <div className="text-3xl font-bold text-center pt-20 uppercase">{course}</div>
      {/* <div className="text-center text-pink-600 border-b border-zinc-200 pb-4">
        {courseFullNames[normalizedCourse] || "Unknown Course"}
      </div> */}
      <h3 className="text-2xl text-center p-4 font-semibold mb-2 border-b border-zinc-200 ">{semester.charAt(0).toUpperCase()+semester.slice(1,8)}-{semester.slice(8)}</h3>
      <div className="flex justify-center text-center items-center border-b border-zinc-200 w-screen p-4 text-xl">
      
        <div className="flex flex-wrap justify-center gap-10 mt-15 mb-20">
          {subjects.length > 0 ? (
            subjects.map((subject, index) => (
              <div
                key={index}
                className="flex flex-col justify-between text-black border border-zinc-200 p-4 rounded-lg shadow-md w-64 lg:shadow-xl"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2">{subject.title}</h3>
                </div>
                <button className="bg-pink-600 text-white p-2 rounded-2xl mt-3">
                  Read More
                </button>
              </div>
            ))
            
          ) : (
            <p className="text-red-500">
              No subjects available for {course} - {semester}.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default DynamicSubjects;
