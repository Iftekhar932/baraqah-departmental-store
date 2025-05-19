import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFirebase from "../hooks/useFirebase";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

// Regex for strong password: at least 1 uppercase, 1 lowercase, 1 number, 1 special character
/* const strongPWD =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      this.password
    ); */

//! check if user created account with google or email, if google then disable other input boxes to make user login with gmail only

//?Study schema design patterns (e.g., polymorphic, bucket patterns)?
//? Common ways to structure data (polymorphic, bucket, outlier, etc.).
//?JSON Web Tokens are used for stateless authentication ok, what's used for authentication with state then?

//? express advanced routing? can i implement in this project to learn it?
//?if find is a method in mognodb then what's aggregation teach me that while implementing in this project
//? Docker: Containerize your backend for easier deployment. can i learn it by implementing here in this project
//? Implement advanced middleware (e.g., rate-limiting, request validation). can i learn it by implementing here in this project

const UserLogin = () => {
  const { signInWithGoogle, loading, setLoading } = useFirebase();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  // const [loading, setLoading] = useState<boolean>(false); // Defined locally

  const navigate = useNavigate();

  // Redirect logged-in users
  useEffect(() => {
    if (localStorage.getItem("userEmail")) {
      navigate("/");
    }
  }, []);

  // Update state when typing
  const infoCollection = (e) => {
    setUserEmail(e.target.form.email.value);
    setUserPassword(e.target.form.password.value);
  };

  // Handle form submission
  const submitFunction = async (
    e: React.MouseEvent<HTMLButtonElement>,
    flag: string = ""
  ) => {
    // flag argument's value is later checked with strict equality for boolean value
    try {
      e.preventDefault();
      setErrorMsg("");
      setLoading(true);

      // on clicking on form button making sure both way of signing in is not initiated
      if (flag === "google") {
        signInWithGoogle();
        return;
      }

      if (!userEmail || !userPassword) {
        setErrorMsg("Enter credentials");
        setLoading(false); // Stop loading if fields are empty
        return;
      }

      const response = await axios.post(
        "https://baraqah-departmental-store-server.onrender.com/login",
        { email: userEmail, password: userPassword },
        { withCredentials: true, timeout: 60000 } // ⏳ 60 seconds timeout
      );

      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.accessToken);
        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("role", response.data.role);
        navigate("/");
      } else {
        setErrorMsg("Login failed, try again!");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 403) {
            setErrorMsg("Invalid email or password");
          } else {
            setErrorMsg(error.response.data?.msg || "Something went wrong");
          }
        } else if (error.code === "ECONNABORTED") {
          setErrorMsg("Server is taking too long to respond. Try again later.");
        } else {
          setErrorMsg("Network error. Please check your internet connection.");
        }
      } else {
        setErrorMsg("An unexpected error occurred.");
      }
    } finally {
      setLoading(false); // ✅ Always stop loading
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="w-3/4 hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Ours is one of the best online grocery shops around the city with
            fresh, healthy, pure products along with fast delivery.
          </p>
        </div>
        {loading ? <LoadingSpinner loading={loading} /> : null}{" "}
        {/* Show spinner if loading */}
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                name="email"
                onKeyUp={(e) => infoCollection(e)}
                required
              />
            </div>

            {errorMsg && <span className="text-red-500">{errorMsg}</span>}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                name="password"
                onKeyUp={(e) => infoCollection(e)}
                required
              />
              <label className="label">
                <Link
                  to="/forgotPassword"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </Link>
                <Link
                  to="/userRegister"
                  className="label-text-alt link link-hover"
                >
                  Don't have an account?
                </Link>
              </label>
            </div>

            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                onClick={(e) => submitFunction(e)}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
            <button
              className="btn btn-primary"
              onClick={(e) => submitFunction(e, "google")}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In with Google"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
