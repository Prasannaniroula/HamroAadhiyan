import React from 'react';
import { useParams } from 'react-router-dom';
import SemPage from '../Pages/semPage';

function SempageWrapper() {

  const { course } = useParams(); // e.g., "csit", "bit", "bba"
  // Define full names for known courses
  const fullNames = {
    csit: 'Bachelor of Science in Computer Science and Information Technology',
    bit: 'Bachelor of Information and Technology',
    bba: 'Bachelor of Business Administration',
  };

  // Fallback if course is unknown
  const fullName = fullNames[course] || 'Unknown Course';

  return (
    <SemPage
      name={course.toUpperCase()}   // e.g., "CSIT"
      fullName={fullName}           // e.g., "Bachelor of Science in..."
      course={course}               // pass original string if needed
    />
  );
}

export default SempageWrapper;
