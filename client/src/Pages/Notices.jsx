import React, { useEffect, useState } from "react";
import axios from "axios";

function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;

  const fetchNotices = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/notices?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );

      setNotices(res.data.notices);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      setError("Unable to load notices.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-pink-50">
        <p className="text-pink-500 font-semibold">Loading notices...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-pink-50">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );

  if (!notices.length)
    return (
      <div className="flex justify-center items-center h-screen bg-pink-50">
        <p className="text-pink-500 font-semibold">No notices available.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50 px-6 py-10">
      <h1 className="text-4xl font-bold text-pink-600 text-center mb-10 drop-shadow-lg">
        Notices
      </h1>

      {/* Notice Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {notices.map((notice) => (
          <a
            key={notice._id}
            href={notice.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-between h-40 p-5 bg-white rounded-3xl shadow-md hover:shadow-xl transition hover:-translate-y-1"
          >
            {/* Title - clamped to 2 lines */}
            <h2 className="text-lg font-semibold text-black mb-2 line-clamp-2">
              {notice.title}
            </h2>

            {/* Date at bottom */}
            <p className="text-zinc-600 text-sm font-medium">
              {notice.adDate.split(" ")[0]}
            </p>
          </a>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center bg-pink-400 text-white rounded-lg disabled:bg-pink-200 disabled:text-gray-400"
        >
          ‹
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition ${
              page === currentPage
                ? "bg-pink-600 text-white"
                : "bg-pink-200 text-pink-700 hover:bg-pink-300"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center bg-pink-400 text-white rounded-lg disabled:bg-pink-200 disabled:text-gray-400"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default Notices;
