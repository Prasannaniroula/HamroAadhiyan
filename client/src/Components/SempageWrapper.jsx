import React from "react";
import { useParams } from "react-router-dom";
import SemPage from "../Pages/SemPage";

function SempageWrapper() {
  const { course } = useParams(); // e.g., "csit", "bit", "bba"

  // Full course names
  const fullNames = {
    csit: "Bachelor of Science in Computer Science and Information Technology",
    bit: "Bachelor of Information and Technology",
    bba: "Bachelor of Business Administration",
  };

  const fullName = fullNames[course.toLowerCase()] || "Unknown Course";

  return (
    <SemPage
      name={course.toUpperCase()}
      fullName={fullName}
      course={course.toLowerCase()}
    />
  );
}

export default SempageWrapper;
