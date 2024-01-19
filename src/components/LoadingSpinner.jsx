import React from "react";

const LoadingSpinner = ({ specifiedClass }) => {
  if (!specifiedClass == "hidden") {
    console.log("yeeee", specifiedClass);
  }
  return (
    <div className={`text-center ${specifiedClass}`}>
      <span className="text-purple-400 loading loading-ring loading-lg"></span>
      <span className="text-purple-800 loading loading-ring loading-lg"></span>
      <span className="text-purple-600 loading loading-ring loading-lg"></span>
    </div>
  );
};

export default LoadingSpinner;
