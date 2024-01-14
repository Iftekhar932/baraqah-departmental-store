import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ErrorComponent = () => {
  const navigate = useNavigate();
  const [userHere, setUserHere] = useState(false); // indicates whether in user's device this component is rendered or not

  // NOTE: the condition with the state is to make sure if user stays in this page error page for 3 seconds, will be redirected. Otherwise won't

  useEffect(() => {
    const timeToNavigate = () => {
      setTimeout(() => setUserHere(() => !userHere), 3000);
    };
    timeToNavigate();

    if (userHere) return navigate("/userLogin");
  }, [userHere]);

  return (
    <div
      className="bg-red-500 text-white font-bold rounded-lg border-l-4 border-red-600 p-4"
      role="alert"
    >
      <p className="font-bold">Error!</p>
      <p>Something went wrong...</p>
      <Link to="/" className="underline cursor-pointer">
        Go to home page
      </Link>
    </div>
  );
};

export default ErrorComponent;
