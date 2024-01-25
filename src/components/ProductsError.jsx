import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductsError = () => {
  const navigate = useNavigate();
  const [userHere, setUserHere] = useState(false); // indicates whether in user's device this component is rendered or not

  /*  NOTE: the condition with the state is to make sure if user stays on
     the error page for 3 seconds will be redirected unless it is this route - '/' (home route) */
  // if user is logged in it won't navigate
  const timeToNavigate = () => {
    if (window.location.pathname != "/") {
      setTimeout(() => setUserHere(!userHere), 3000);
    }
    if (userHere) {
      navigate("/userLogin");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("userEmail")) {
      timeToNavigate();
    }
  }, [userHere]);

  return (
    <div
      className="bg-purple-700 text-white font-bold rounded-lg border-l-4 border-purple-600 p-4"
      role="alert"
    >
      {localStorage.getItem("userEmail") ? (
        <p>Something went wrong</p>
      ) : (
        <>
          <Link to="/userLogin" className="underline cursor-pointer">
            Login here
          </Link>
          <p>Login to see products...</p>
        </>
      )}
    </div>
  );
};

export default ProductsError;
