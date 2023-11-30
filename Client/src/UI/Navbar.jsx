import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BsChatRightQuote,
  BsFeather,
  BsBook,
  BsPersonCircle,
} from "react-icons/bs";
import { AuthContext } from "../AuthContext/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [showMenuProfile, setShowMenuProfile] = useState(false);
  const [showMenuCourse, setShowMenuCourse] = useState(false);
  // const [showMenuProfile, setShowMenuProfile] = useState(false);
  const menuRef = useRef(null);

  const toggleMenuProfile = () => {
    setShowMenuProfile(!showMenuProfile);
  };
  const toggleMenuCourse = () => {
    setShowMenuCourse(!showMenuCourse);
  };

  const closeMenu = () => {
    setShowMenuProfile(false);
    setShowMenuCourse(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="w-full">
      <section
        id="bottom-navigation"
        className="block fixed inset-x-0 bottom-0 z-10 bg-teal-300"
      >
        <div id="tabs" className="flex justify-between">
          {(user?.role === "student") | "admin" ? (
            <Link
              to="/feedbacks"
              className="w-full focus:text-white hover:text-white flex flex-col items-center py-2"
            >
              <BsChatRightQuote size={24} />
              <span className="tab text-xs">Feedback</span>
            </Link>
          ) : (
            <Link
              to="/leave-feedbacks"
              className="w-full focus:text-white hover:text-white flex flex-col items-center py-2"
            >
              <BsChatRightQuote size={24} />
              <span className="tab text-xs">Feedback</span>
            </Link>
          )}
          {user?.role === "student" && (
            <Link
              to="/submit-thesis"
              className="w-full focus:text-white hover:text-white  flex flex-col items-center py-2"
            >
              <BsFeather size={24} />
              <span className="tab text-xs">Submit Thesis</span>
            </Link>
          )}

          {user?.role === "supervisor" && (
            <Link
              to="/student-thesis"
              className="w-full focus:text-white hover:text-white  flex flex-col items-center py-2"
            >
              <BsFeather size={24} />
              <span className="tab text-xs">Student Thesis</span>
            </Link>
          )}
          {user?.role === "admin" && (
            <Link
              to="/"
              className="w-full focus:text-white hover:text-white  flex flex-col items-center py-2"
            >
              <BsFeather size={24} />
              <span className="tab text-xs">Student Thesis</span>
            </Link>
          )}
          <div className="w-full focus:text-white hover:text-white flex flex-col items-center py-2">
            <button
              onClick={toggleMenuCourse}
              className="focus:text-white hover:text-white flex flex-col items-center py-2"
            >
              <BsBook size={24} />
              <span className="tab text-xs">My Courses</span>
            </button>
            {showMenuCourse && (
              <div
                ref={menuRef}
                className="absolute text-black  bottom-full bg-white p-2"
              >
                <>
                  <Link to="/register-course" className="block py-2">
                    Register Course
                  </Link>

                  <Link to="/my-courses" className="block py-2">
                    My Courses
                  </Link>
                </>
              </div>
            )}
          </div>
          <div className="w-full focus:text-white hover:text-white flex flex-col items-center py-2">
            <button
              onClick={toggleMenuProfile}
              className="focus:text-white hover:text-white flex flex-col items-center py-2"
            >
              <BsPersonCircle size={24} />
              <span className="tab text-xs">Profile</span>
            </button>
            {showMenuProfile && (
              <div
                ref={menuRef}
                className="absolute text-black  bottom-full bg-white p-2"
              >
                {user ? (
                  <>
                    <Link onClick={() => logout()} to="" className="block py-2">
                      Logout
                    </Link>
                    <Link to="/profile" className="block py-2">
                      Profile
                    </Link>
                    {user?.role == "admin" && (
                      <>
                        <Link to="/users" className="block py-2">
                          Users
                        </Link>
                        <Link to="/dashboard" className="block py-2">
                          Dashboard
                        </Link>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Link to="/register" className="block py-2">
                      Register
                    </Link>
                    <Link to="/login" className="block py-2">
                      Login
                    </Link>
                    <Link to="/profile" className="block py-2">
                      Profile
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
