import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ErrorComponent = () => {
  const navigate = useNavigate();
  const [userHere, setUserHere] = useState(false);

  // NOTE: the condition with the state is to make sure if user stays on the error page for 3 seconds will be redirected otherwise won't
  useEffect(() => {
    const timeToNavigate = () => {
      setTimeout(() => setUserHere(() => !userHere), 3000);
    };
    timeToNavigate();

    if (userHere) return navigate("/userLogin");
  }, [userHere]);

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
