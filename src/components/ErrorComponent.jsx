import React from "react";
import { Link } from "react-router-dom";

const ErrorComponent = () => {
  return (
    <div
      className="bg-red-500 text-white font-bold rounded-lg border-l-4 border-red-700 p-4"
      role="alert"
    >
      <p className="font-bold">Error!</p>
      <p>Something went wrong...</p>
      <Link to="/" className="underline cursor-pointer">
        Go back.
      </Link>
    </div>
  );
};

export default ErrorComponent;
