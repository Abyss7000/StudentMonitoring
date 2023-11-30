import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterCourse = () => {
  const { user, token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    courseID: "",
  });

  const [courseDetails, setCourseDetails] = useState({
    courseId: "",
    departmentId: "",
  });

  const [courseOptions, setCourseOptions] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/course/get-courses",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setCourseOptions(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseChange = (selectedCourseId) => {
    const selectedCourse = courseOptions.find(
      (course) => course.courseID === selectedCourseId
    );

    if (selectedCourse) {
      setCourseDetails({
        courseId: selectedCourse.courseID,
        departmentId: selectedCourse.department[0]?.name || "Not Available",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "courseID") {
      handleCourseChange(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/course/registration",
        {
          courseID: courseDetails.courseId,
          userID: user?.userID || "",
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md mt-8 shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Register Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="courseID"
            className="block text-sm font-medium text-gray-600"
          >
            Course Name
          </label>
          <select
            id="courseID"
            name="courseID"
            value={formData.courseID}
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
          <p className="text-sm font-medium text-gray-600">
            Selected Course Details
          </p>
          <p>Course ID: {courseDetails.courseId}</p>
          <p>Department: {courseDetails.departmentId}</p>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterCourse;
