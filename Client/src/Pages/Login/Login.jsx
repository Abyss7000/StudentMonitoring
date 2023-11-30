import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { login, setToken } = useContext(AuthContext);
  const onSubmit = async (data) => {
    try {
      // Make your API request to login
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        data
      );

      if (response.status === 200) {
        const token = response.data.token;
        login(token);
        navigate("/profile");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <div className="w-96 p-6 bg-gray-100 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold">
              Email:
            </label>
            <input
              id="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="text"
              placeholder="Email"
              {...register("email")}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold">
              Password:
            </label>

            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
