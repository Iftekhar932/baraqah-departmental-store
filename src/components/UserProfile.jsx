import React from "react";
import { useLoaderData } from "react-router-dom";

const UserProfile = ({ user }) => {
  const loadedData = useLoaderData();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center dark:bg-gray-800 p-4 rounded-lg shadow w-full sm:w-3/4 lg:w-1/2">
      <img
        className="w-16 h-16 sm:w-24 sm:h-24 rounded-full mx-auto sm:mx-0 sm:mr-6"
        src={user?.avatar}
        alt="User avatar"
      />
      <div className="text-center sm:text-left">
        <h2 className="text-lg">{user?.name}</h2>
        <div className="text-purple-500">{user?.email}</div>
        <div className="text-gray-600">{user?.phone}</div>
        <div className="text-gray-600">{user?.address}</div>
      </div>
    </div>
  );
};

export default UserProfile;
