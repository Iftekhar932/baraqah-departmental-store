import React from "react";

const LoadingSpinner = ({ loading }) => {
  console.log("🚀 ~ LoadingSpinner ~ loading:", loading);
  return (
    <div className={`text-center my-4 ${loading ? "hidden" : ""}`}>
      <span className="text-purple-400 loading loading-ring loading-lg"></span>
      <span className="text-purple-800 loading loading-ring loading-lg"></span>
      <span className="text-purple-600 loading loading-ring loading-lg"></span>
    </div>
  );
};

export default LoadingSpinner;
