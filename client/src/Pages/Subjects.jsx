import { useState, useEffect } from "react";
import axios from "axios";

export default function SemesterSubjects({ courseId }) {
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const backendUrl = "http://localhost:8000/api"; // adjust if needed

  // Fetch course data on mount
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/courses/${courseId}`);
        setSemesters(data.semesters);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    fetchCourse();
  }, [courseId]);

  // Fetch subjects for a selected semester
  const handleSemesterClick = (semesterNumber) => {
    setSelectedSemester(semesterNumber);
    setSelectedSubject(null); // reset subject
    const semesterData = semesters.find((s) => s.semester === semesterNumber);
    if (semesterData) setSubjects(semesterData.subjects);
    else setSubjects([]);
  };

  // Handle subject click
  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Select a Semester</h2>
      
      {/* Semester buttons */}
      <div className="flex gap-2 mb-6">
        {semesters.map((s) => (
          <button
            key={s.semester}
            onClick={() => handleSemesterClick(s.semester)}
            className={`px-4 py-2 rounded ${
              selectedSemester === s.semester ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Semester {s.semester}
          </button>
        ))}
      </div>

      {/* Subjects */}
      {subjects.length > 0 ? (
        <div>
          <h3 className="text-xl font-semibold mb-2">Subjects:</h3>
          <ul className="list-disc list-inside">
            {subjects.map((subj, idx) => (
              <li
                key={idx}
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => handleSubjectClick(subj)}
              >
                {subj.name}
              </li>
            ))}
          </ul>
        </div>
      ) : selectedSemester ? (
        <p>No subjects found for this semester.</p>
      ) : (
        <p>Please select a semester.</p>
      )}

      {/* Subject Details */}
      {selectedSubject && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="text-xl font-bold mb-2">{selectedSubject.name}</h3>

          {selectedSubject.notesUrl && (
            <p>
              Notes:{" "}
              <a
                href={selectedSubject.notesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Notes
              </a>
            </p>
          )}

          {selectedSubject.syllabus && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Syllabus:</h4>
              <pre className="whitespace-pre-wrap bg-white p-3 rounded shadow-sm">
                {selectedSubject.syllabus}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
