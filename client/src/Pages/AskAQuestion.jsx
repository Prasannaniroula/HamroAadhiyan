import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/Appcontext";

function AskQuestion() {
  const { backendUrl, isLoggedIn, userData } = useContext(AppContext);
  const [user, setUser] = useState(undefined); // undefined = loading
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
      .get(`${backendUrl}/api/user/data`, { withCredentials: true })
      .then((res) => {
        if (res.data.success) setUser(res.data.userData);
        else setUser(null);
      })
      .catch(() => setUser(null));
  }, []);

  // ---------------- Fetch courses ----------------
  useEffect(() => {
    axios
      .get(`${backendUrl}/api/courses`)
      .then((res) => setCourses(res.data))
      .catch(console.error);
  }, []);

  // ---------------- Update subjects ----------------
  useEffect(() => {
    if (formData.course && formData.semester) {
      const selectedCourse = courses.find(
        (c) => c.alias === formData.course
      );

      const semesterData = selectedCourse?.semesters.find(
        (s) => String(s.semester) === String(formData.semester)
      );

      setSubjects(semesterData?.subjects || []);
      setFormData((prev) => ({ ...prev, subject: "" }));
    } else {
      setSubjects([]);
    }
  }, [formData.course, formData.semester, courses]);

  // ---------------- Fetch questions ----------------
  const fetchQuestions = () => {
    axios
      .get(`${backendUrl}/api/questions`)
      .then((res) => {
        if (res.data.success) setQuestions(res.data.questions);
      })
      .catch(console.error);
  };

  useEffect(() => fetchQuestions(), []);

  // ---------------- Handle form input ----------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ---------------- Handle submit ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Login required to ask a question.");
      return;
    }

    try {
      await axios.post(`${backendUrl}/api/questions`, formData, {
        withCredentials: true,
      });

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
      alert("Failed to submit question.");
    }
  };

  // ---------------- LOADING ----------------
  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Checking login status...</p>
      </div>
    );
  }

  // ---------------- NOT LOGGED IN ----------------
  if (user === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-bold text-pink-600">
            Login Required
          </h2>
          <p className="text-gray-600 mt-3">
            You must be logged in to ask a question.
          </p>
          <a
            href="/login"
            className="inline-block mt-5 px-6 py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // ---------------- LOGGED IN UI ----------------
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
