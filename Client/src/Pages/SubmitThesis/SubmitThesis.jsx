import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const SubmitThesis = () => {
  const { user, token } = useContext(AuthContext);

  const [thesisData, setThesisData] = useState({
    title: "",
    details: "",
    studentID: user?.userID || "",
    supervisorID: "",
    courseID: "",
  });

  const [supervisors, setSupervisors] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/auth/supervisors",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setSupervisors(response.data.supervisors);
      } catch (error) {
        console.error("Error fetching supervisors", error);
      }
    };

    // Fetch courses
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/course/get-courses/${user?.userID}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setCourseOptions(response.data.courses.courses);
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };

    fetchSupervisors();
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setThesisData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/thesis/create-thesis",
        thesisData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      toast.success(res?.data?.message);
      setThesisData("");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md mt-8 shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Submit Thesis</h2>
      <form onSubmit={handleSubmit}>
        {/* Other form fields */}
        <div className="mb-4">
          <label
            htmlFor="supervisorID"
            className="block text-sm font-medium text-gray-600"
          >
            Supervisor
          </label>
          <select
            id="supervisorID"
            name="supervisorID"
            value={thesisData.supervisorID}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            <option value="" disabled>
              Select Supervisor
            </option>
            {supervisors.map((supervisor) => (
              <option key={supervisor.userID} value={supervisor.userID}>
                {supervisor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="courseID"
            className="block text-sm font-medium text-gray-600"
          >
            Course
          </label>
          <select
            id="courseID"
            name="courseID"
            value={thesisData.courseID}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            <option value="" disabled>
              Select Course
            </option>
            {courseOptions.map((course) => (
              <option key={course._id} value={course.courseID}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Thesis Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={thesisData.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="details"
            className="block text-sm font-medium text-gray-600"
          >
            Thesis Details
          </label>
          <textarea
            id="details"
            name="details"
            value={thesisData.details}
            onChange={handleChange}
            rows="4"
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit Thesis
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SubmitThesis;
