import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductsError = () => {
  const navigate = useNavigate();
  const [userHere, setUserHere] = useState(false);

  // NOTE: the condition with the state is to make sure if user stays on the error page for 3 seconds will be redirected otherwise won't
  useEffect(() => {
    const timeToNavigate = () => {
      if (window.location.pathname != "/")
        setTimeout(() => setUserHere(() => !userHere), 3000);
    };
    timeToNavigate();
    if (userHere) return navigate("/userLogin");
  }, [userHere]);

  return (
    <div
      className="bg-purple-700 text-white font-bold rounded-lg border-l-4 border-purple-600 p-4"
      role="alert"
    >
      <p className="font-bold">Not logged in!</p>
      <p>Login to see products...</p>
      <Link to="/" className="underline cursor-pointer">
        Login here
      </Link>
    </div>
  );
};

export default ProductsError;
