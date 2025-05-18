import React from "react";

const LoadingSpinner = ({ loading }: { loading: boolean }) => {
  return (
    <div className={`text-center my-4 ${loading == false ? "hidden" : ""}`}>
      <span className="text-purple-400 loading loading-ring loading-lg"></span>
      <span className="text-purple-800 loading loading-ring loading-lg"></span>
      <span className="text-purple-600 loading loading-ring loading-lg"></span>
    </div>
  );
};

export default LoadingSpinner;
