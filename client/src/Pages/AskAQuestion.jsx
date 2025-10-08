import React, { useState } from "react";

function AskQuestion() {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    course: "",
    subject: "",
    semester: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.details) {
      alert("Please fill all required fields!");
      return;
    }

    setQuestions([
      ...questions,
      { id: questions.length + 1, ...formData, date: new Date().toLocaleDateString() },
    ]);

    setFormData({ title: "", details: "", course: "", subject: "", semester: "" });
  };

  return (
    <div className="bg-gradient-to-b from-pink-50 via-white to-pink-50 min-h-screen">
      {/* Hero */}
      <div className="text-center py-12 px-6">
        <h1 className="text-4xl font-bold text-pink-600 drop-shadow-lg">
          Ask a Question
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Share your doubts and get help from peers and educators. Let's make learning easier together!
        </p>
      </div>

      {/* Form Section */}
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
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="p-4 rounded-xl bg-pink-50 focus:bg-white focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-inner transition"
            >
              <option value="">Select Course</option>
              <option value="csit">B.Sc. CSIT</option>
              <option value="bit">BIT</option>
              <option value="bba">BBA</option>
              <option value="ee">Electrical Engineering</option>
              <option value="ece">Electronics Engineering</option>
              <option value="zoology">B.Sc. Zoology</option>
            </select>

            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="p-4 rounded-xl bg-pink-50 focus:bg-white focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-inner transition"
            >
              <option value="">Select Semester</option>
              <option value="1st">1st Semester</option>
              <option value="2nd">2nd Semester</option>
              <option value="3rd">3rd Semester</option>
              <option value="4th">4th Semester</option>
              <option value="5th">5th Semester</option>
              <option value="6th">6th Semester</option>
              <option value="7th">7th Semester</option>
              <option value="8th">8th Semester</option>
            </select>

            <input
              type="text"
              name="subject"
              placeholder="Enter Subject"
              value={formData.subject}
              onChange={handleChange}
              className="p-4 rounded-xl bg-pink-50 focus:bg-white focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-inner transition"
            />

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
                key={q.id}
                className="p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <h3 className="text-lg font-semibold text-pink-600">{q.title}</h3>
                <p className="text-gray-700 mt-1">{q.details}</p>
                <div className="text-sm text-gray-500 mt-2">
                  {q.course ? `${q.course.toUpperCase()} • ${q.subject || "General"} • ${q.semester}` : "General"} | {q.date}
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
