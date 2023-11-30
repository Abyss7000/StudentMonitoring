import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [departmentID, setDepartmentID] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [courseID, setCourseID] = useState("");
  const [courseName, setCourseName] = useState("");

  const handleAddDepartment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/department/add-department",
        {
          departmentID: departmentID,
          name: departmentName,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      toast.success(res.data.message);
      setDepartmentID("");
      setDepartmentName("");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleCreateCourse = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/course/create-course",
        { courseID, departmentID, name: courseName },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      toast.success(res.data.message);
      setCourseName("");
      setCourseID("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto ">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 ">
        <div className="flex flex-col w-full md:w-1/2 bg-white rounded-md mt-8 shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Add Department</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="departmentID"
                className="block text-sm font-medium text-gray-600"
              >
                Department ID
              </label>
              <input
                type="text"
                id="departmentID"
                name="departmentID"
                value={departmentID}
                onChange={(e) => setDepartmentID(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="departmentName"
                className="block text-sm font-medium text-gray-600"
              >
                Department Name
              </label>
              <input
                type="text"
                id="departmentName"
                name="departmentName"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <button
              type="button"
              onClick={handleAddDepartment}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Department
            </button>
          </form>
        </div>

        {/* Course Form */}
        <div
          style={{ marginTop: "32px" }}
          className="flex flex-col w-full md:w-1/2 bg-white rounded-md mt-8 shadow-md p-4"
        >
          <h2 className="text-xl font-semibold mb-2">Create Course</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="courseID"
                className="block text-sm font-medium text-gray-600"
              >
                Course ID
              </label>
              <input
                type="text"
                id="courseID"
                name="courseID"
                value={courseID}
                onChange={(e) => setCourseID(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="courseName"
                className="block text-sm font-medium text-gray-600"
              >
                Course Name
              </label>
              <input
                type="text"
                id="courseName"
                name="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <button
              type="button"
              onClick={handleCreateCourse}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Create Course
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Dashboard;
