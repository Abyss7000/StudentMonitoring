import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../UI/Navbar";

const Main = () => {
  return (
    <div>
      <Outlet></Outlet>
      <Navbar />
    </div>
  );
};

export default Main;
