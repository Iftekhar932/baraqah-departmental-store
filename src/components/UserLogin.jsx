import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFirebase from "../hooks/useFirebase";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const UserLogin = () => {
  const { signInWithGoogle } = useFirebase();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false); // Defined locally

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
  const submitFunction = async (e, flag) => {
    try {
      e.preventDefault();
      setErrorMsg("");
      setLoading(true);

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
        { withCredentials: true, timeout: 10000 } // ⏳ 10s timeout
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

      if (error.code === "ECONNABORTED") {
        setErrorMsg("Server is taking too long to respond. Try again later.");
      } else if (error.response) {
        setErrorMsg(error.response.data?.msg || "Invalid credentials");
      } else {
        setErrorMsg("Network error. Please check your internet connection.");
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
        {loading ? <LoadingSpinner /> : null} {/* Show spinner if loading */}
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
                onClick={submitFunction}
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
