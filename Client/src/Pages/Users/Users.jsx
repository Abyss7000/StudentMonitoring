import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../AuthContext/AuthContext";

const Users = () => {
  const { token, user } = useContext(AuthContext);
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/auth/all-users`, {
          headers: {
            authorization: `${token}`,
          },
        });
        const data = await res.json();

        console.log(data);
        return data.users;
      } catch {
        throw new Error("Failed to load users");
      }
    },
  });

  const handleDeleteUser = (id) => {
    fetch(`http://localhost:8000/api/auth/delete-user/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `${token}`,
      },
    }).then((res) => {
      res.json();

      if (res.status === 200) {
        refetch();
        toast.success("User Deleted");
      }
      console.log(res);
    });
  };

  // to change status
  const handleChangeRole = (id) => {
    axios
      .put(`http://localhost:8000/api/auth/change-role/${id}`, {
        role: selectedRole,
      })
      .then((res) => {
        if (res.status === 200) {
          refetch();
          toast.success("User Role Updated");
          setEditingUserId(null);
        }
      })
      .catch((error) => {
        console.error("Error changing role:", error);
      });
  };

  return (
    <>
      <section className="container mt-10 px-4 mx-auto overflow-x-hidden">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium">Total Users</h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {users?.length} users
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
                          <span>Role</span>

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
                        Email address
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        User ID
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {users?.map((user, index) => (
                      <tr key={user._id}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <div className="flex items-center gap-x-2">
                              <div>
                                <h2 className="font-medium text-gray-800  ">
                                  {user.name}
                                </h2>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            {editingUserId === user._id ? (
                              <div>
                                <select
                                  value={selectedRole}
                                  onChange={(e) =>
                                    setSelectedRole(e.target.value)
                                  }
                                >
                                  <option value="" disabled>
                                    Select Role
                                  </option>
                                  <option value="student">Student</option>
                                  <option value="admin">Admin</option>
                                  <option value="supervisor">Supervisor</option>
                                </select>
                                <button
                                  onClick={() => handleChangeRole(user.userID)}
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <p className="px-3 py-1 text-xs text-pink-500 rounded-full dark:bg-gray-800 bg-pink-100/60">
                                {user.role}
                                <button
                                  onClick={() => setEditingUserId(user._id)}
                                  className="ml-2 text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500  hover:text-yellow-500 focus:outline-none"
                                >
                                  Edit
                                </button>
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          {user.email}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          {user.userID}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500  hover:text-red-500 focus:outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>

                            <button
                              onClick={() => {
                                handleChangeRole(user.userID);
                              }}
                              className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500  hover:text-yellow-500 focus:outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Users;
