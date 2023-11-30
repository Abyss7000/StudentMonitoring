import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Register() {
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        data
      );

      setSuccessMessage(response.data.message);
      console.log(data);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <div className="w-96 p-6 bg-gray-100 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true, maxLength: 80 })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="userID" className="block text-sm font-semibold">
              UserID:
            </label>
            <input
              type="text"
              id="userID"
              {...register("userID", { required: true })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold">
              Email:
            </label>
            <input
              type="text"
              id="email"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
