import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ErrorComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeToNavigate = () => {
      setTimeout(() => navigate("/userLogin"), 1800);
    };
    timeToNavigate();
  }, []);

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
