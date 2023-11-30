import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext/AuthContext";

const StudentThesis = () => {
  const { user, token } = useContext(AuthContext);
  const [thesisData, setThesisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThesisData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/thesis/${user?.userID}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setThesisData(response.data.thesis);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchThesisData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md mt-8 shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Student Thesis</h2>
      {thesisData && thesisData.length > 0 ? (
        thesisData.map((thesis) => (
          <div key={thesis.id} className="mb-4">
            <p>Title: {thesis.title}</p>
            <p>Details: {thesis.details}</p>
            <p>Course ID: {thesis.courseID}</p>
            <p>Supervisor ID: {thesis.supervisorID}</p>
            <p>Status: {thesis.status}</p>
            <p>
              Submission Date:{" "}
              {new Date(thesis.submissionDate).toLocaleString()}
            </p>
            {/* You can add more details as needed */}
          </div>
        ))
      ) : (
        <p>No thesis data available.</p>
      )}
    </div>
  );
};

export default StudentThesis;
