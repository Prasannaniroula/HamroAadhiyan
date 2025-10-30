import React, { useState } from 'react';
function SemPage({ name, fullName, course }) {
  const [selectedTab, setSelectedTab] = useState("semesters");

  return (
    <>
      <div className="w-screen">
        <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
        <div className="text-3xl font-bold text-center pt-20">{name}</div>
        <div className="text-center text-pink-600 border-b border-zinc-200 pb-15 p-4">
          {fullName}
        </div>
        </div>

        <div className="flex justify-center text-center items-center border-b border-zinc-200 w-screen p-4 text-xl">
          <button
            className={`w-1/2 hover:text-pink-600 ${
              selectedTab === 'semesters' ? 'text-pink-600 font-semibold text-xl' : ''
            }`}
            onClick={() => setSelectedTab('semesters')}
          >
            Semesters
          </button>
          <button
            className={`w-1/2 hover:text-pink-600  text-xl ${
              selectedTab === 'notices' ? 'text-pink-600 font-semibold text-xl' : ''
            }`}
            onClick={() => setSelectedTab('notices')}
          >
            Notices
          </button>
        </div>

        <div className="p-4">
          {selectedTab === 'semesters' && (
            <>
              <Semester course={course} />
            </>
          )}

          {selectedTab === 'notices' && (
            <div className="space-y-3">
              <div className="p-4 border rounded shadow">
                📢 Notice 1: Exam form deadline is July 20
              </div>
              <div className="p-4 border rounded shadow">
                📢 Notice 2: College closed on Friday
              </div>
              <div className="p-4 border rounded shadow">
                📢 Notice 3: New class routine uploaded
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Semester({ course }) {
  const semesters = [
    { number: 1, subjects: 5 },
    { number: 2, subjects: 5 },
    { number: 3, subjects: 5 },
    { number: 4, subjects: 5 },
    { number: 5, subjects: 6 },
    { number: 6, subjects: 6 },
    { number: 7, subjects: 5 },
    { number: 8, subjects: 4 }
  ];

  const getOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"],
          v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-10">
      {semesters.map((sem) => (
        <div key={sem.number}>
          <a
            href={`${course}/semester${sem.number}`} // OR use <Link> if you're using React Router
            className="bg-white text-black rounded-xl border border-zinc-200 shadow-md p-4 flex items-center space-x-4 hover:shadow-lg transition"
          >
            <div className="text-center">
              <div className="text-3xl font-bold">{getOrdinal(sem.number)}</div>
              <div className="text-sm">Semester</div>
            </div>
            <div>
              <div className="text-xl font-semibold">
                {getOrdinal(sem.number)} Semester
              </div>
              <div className="text-pink-400">{sem.subjects} Subjects</div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default SemPage;
