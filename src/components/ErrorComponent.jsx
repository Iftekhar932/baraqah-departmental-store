import React from "react";

const ErrorComponent = () => {
  return (
    <div
      className="bg-red-500 text-white font-bold rounded-lg border-l-4 border-red-700 p-4"
      role="alert"
    >
      <p className="font-bold">Error!</p>
      <p>Something went wrong...</p>
    </div>
  );
};

export default ErrorComponent;
