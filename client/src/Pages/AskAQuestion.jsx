// AskQuestion.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function AskQuestion() {
  const [user, setUser] = useState(null); // logged-in user info
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    details: "",
    course: "",
    semester: "",
    subject: "",
  });

  // ---------------- Fetch logged-in user ----------------
  useEffect(() => {
    axios
      .get("/api/user/data", { withCredentials: true })
      .then((res) => {
        if (res.data.success) setUser(res.data.userData);
      })
      .catch(() => setUser(null));
  }, []);

  // ---------------- Fetch all courses ----------------
  useEffect(() => {
    axios
      .get("/api/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  // ---------------- Update subjects when course/semester changes ----------------
  useEffect(() => {
    if (formData.course && formData.semester) {
      const selectedCourse = courses.find((c) => c.alias === formData.course);
      if (!selectedCourse) {
        setSubjects([]);
        return;
      }

      const semesterData = selectedCourse.semesters.find(
        (s) => String(s.semester) === String(formData.semester)
      );

      setSubjects(semesterData?.subjects || []);
      setFormData((prev) => ({ ...prev, subject: "" })); // reset subject
    } else {
      setSubjects([]);
      setFormData((prev) => ({ ...prev, subject: "" }));
    }
  }, [formData.course, formData.semester, courses]);

  // ---------------- Fetch all questions ----------------
  const fetchQuestions = () => {
    axios
      .get("/api/questions")
      .then((res) => {
        if (res.data.success) setQuestions(res.data.questions);
      })
      .catch((err) => console.error("Error fetching questions:", err));
  };

  useEffect(() => fetchQuestions(), []);

  // ---------------- Handle form input ----------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ---------------- Handle form submission ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, details, course } = formData;
    if (!title || !details || !course) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      await axios.post("/api/questions", formData, { withCredentials: true });
      setFormData({
        title: "",
        details: "",
        course: "",
        semester: "",
        subject: "",
      });
      setSubjects([]);
      fetchQuestions();
    } catch (err) {
      console.error("Error submitting question:", err);
      alert("Failed to submit question. Try again.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-pink-50 via-white to-pink-50 min-h-screen">
      {/* Header */}
      <div className="text-center py-12 px-6">
        <h1 className="text-4xl font-bold text-pink-600 drop-shadow-lg">
          Ask a Question
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Share your doubts and get help from peers and educators. Let's make
          learning easier together!
        </p>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto p-10 bg-white rounded-3xl shadow-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            name="title"
            placeholder="Question Title *"
            value={formData.title}
            onChange={handleChange}
            className="p-4 rounded-xl bg-pink-50 focus:bg-white focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-inner transition"
            required
          />
          <textarea
            name="details"
            placeholder="Describe your question in detail *"
            value={formData.details}
            onChange={handleChange}
            className="p-4 rounded-xl bg-pink-50 focus:bg-white focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-inner h-32 transition"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Course */}
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="p-4 rounded-xl bg-pink-50 focus:bg-white focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-inner transition"
              required
            >
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c._id} value={c.alias}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Semester */}
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="p-4 rounded-xl bg-pink-50 focus:bg-white focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-inner transition"
              required
            >
              <option value="">Select Semester</option>
              {formData.course &&
                courses
                  .find((c) => c.alias === formData.course)
                  ?.semesters.map((s) => (
                    <option key={s.semester} value={s.semester}>
                      {s.semester}
                    </option>
                  ))}
            </select>

            {/* Subject */}
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="p-4 rounded-xl bg-pink-50 focus:bg-white focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-inner transition"
            >
              <option value="">Select Subject</option>
              {subjects.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="py-4 bg-gradient-to-r from-pink-500 to-pink-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            Submit Question
          </button>
        </form>
      </div>

      {/* Question Feed */}
      <div className="max-w-4xl mx-auto mt-12 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Questions</h2>
        {questions.length === 0 ? (
          <p className="text-gray-500">No questions yet. Be the first to ask!</p>
        ) : (
          <div className="space-y-4">
            {questions.map((q) => (
              <div
                key={q._id}
                className="p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition flex gap-4"
              >
                {/* Avatar */}
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-400 text-white font-bold text-xl">
                  {q.createdByName ? q.createdByName[0] : "A"}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-pink-600">
                    {q.createdByName || "Anonymous"}
                  </h3>
                  <p className="text-gray-700 mt-1 font-medium">{q.title}</p>
                  <p className="text-gray-500 mt-1">{q.details}</p>
                  <div className="text-sm text-gray-400 mt-2">
                    {q.course?.toUpperCase() || "General"} • {q.subject || "General"} •{" "}
                    {q.semester || "General"} | {new Date(q.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AskQuestion;
