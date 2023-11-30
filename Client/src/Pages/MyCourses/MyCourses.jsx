import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";

const MyCourses = () => {
  const { user, token } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const userID = user?.userID;
    if (userID) {
      axios
        .get(
          `http://localhost:8000/api/course/get-courses/${userID}`,

          {
            headers: {
              Authorization: `${token}`,
            },
          }
        )
        .then((response) => {
          setCourses(response.data.courses.courses);
        })
        .catch((error) => {
          console.error("Error fetching courses:", error);
        });
    }
  }, [user]);

  return (
    <section className="container mt-10 px-4 mx-auto overflow-x-hidden">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium">Total courses</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
          {courses?.length} courses
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-hidden sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50 ">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Name</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Department ID</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                          />
                        </svg>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Course ID
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {courses?.map((course, index) => (
                    <tr key={course._id}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center gap-x-3">
                          <div className="flex items-center gap-x-2">
                            <div>
                              <h2 className="font-medium text-gray-800  ">
                                {course.name}
                              </h2>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {course.departmentID}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {course.courseID}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyCourses;
