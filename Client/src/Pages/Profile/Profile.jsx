import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-center  h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
        <div>
          <strong>Name:</strong> {user?.name}
        </div>
        <div>
          <strong>User ID:</strong> {user?.userID}
        </div>
        <div>
          <strong>Email:</strong> {user?.email}
        </div>
        <div>
          <strong>Role:</strong> {user?.role}
        </div>
      </div>
    </div>
  );
};

export default Profile;
