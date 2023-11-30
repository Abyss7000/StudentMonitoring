import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Registe/Register";
import Login from "../Pages/Login/Login";
import Profile from "../Pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import Users from "../Pages/Users/Users";
import AdminRoute from "./AdminRoute";
import RegisterCourse from "../Pages/RegisterCourse/RegisterCourse";
import MyCourses from "../Pages/MyCourses/MyCourses";
import SubmitThesis from "../Pages/SubmitThesis/SubmitThesis";
import FeedBack from "../Pages/FeedBack/FeedBack";
import StudentThesis from "../Pages/StudentThesis/StudentThesis";
import LeaveFeedback from "../Pages/LeaveFeedback/LeaveFeedback";
import Dashboard from "../Pages/Dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
      },
      {
        path: "/register-course",
        element: (
          <PrivateRoute>
            <RegisterCourse />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-courses",
        element: (
          <PrivateRoute>
            <MyCourses />
          </PrivateRoute>
        ),
      },
      {
        path: "/submit-thesis",
        element: (
          <PrivateRoute>
            <SubmitThesis />
          </PrivateRoute>
        ),
      },
      {
        path: "/feedbacks",
        element: (
          <PrivateRoute>
            <FeedBack />
          </PrivateRoute>
        ),
      },
      {
        path: "/student-thesis",
        element: (
          <PrivateRoute>
            <StudentThesis />
          </PrivateRoute>
        ),
      },
      {
        path: "/leave-feedbacks",
        element: (
          <PrivateRoute>
            <LeaveFeedback />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <div>
        <p>no route found</p>
      </div>
    ),
  },
]);
