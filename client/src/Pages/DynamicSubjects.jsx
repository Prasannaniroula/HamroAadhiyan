import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DynamicSubjects() {
  const { course, semester } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [courseFullName, setCourseFullName] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/courses/${course}`
        );

        const courseData = res.data;
        setCourseFullName(courseData.name);

        // Find semester data
        const semData = courseData.semesters.find(
          (s) => s.semester.toString() === semester.replace("semester", "")
        );

        if (semData) setSubjects(semData.subjects);
      } catch (err) {
        console.error("Error fetching subjects:", err);
        setSubjects([]);
      }
    };

    fetchSubjects();
  }, [course, semester]);

  return (
    <div>
      {/* Course Title */}
      <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
        <div className="text-center pt-20 px-6">
          <h1 className="text-4xl font-extrabold uppercase tracking-wide text-gray-800">
            {course.toUpperCase()}
          </h1>
          <p className="text-pink-600 mt-2 font-medium">
            {courseFullName || "Unknown Course"}
          </p>
        </div>

        {/* Semester */}
        <h3 className="text-2xl text-center mt-6 pb-12 font-semibold">
          {semester.charAt(0).toUpperCase() + semester.slice(1)}
        </h3>
      </div>

      {/* Subjects */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center p-10">
        {subjects.length > 0 ? (
          subjects.map((subject, index) => (
            <div
              key={index}
              className="group bg-white flex flex-col justify-between items-center text-black border border-zinc-200 p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 w-96"
            >
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-2 text-center">
                  {subject.name}
                </h3>
                <p className="text-sm text-gray-500 text-center">
                  {subject.syllabus?.slice(0, 200) || "No syllabus available"}...
                </p>
              </div>

              <a
                href={subject.notesUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full mt-4 transition-colors"
              >
                Read Notes
              </a>
            </div>
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
