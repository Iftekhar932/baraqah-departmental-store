import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFirebase from "../hooks/useFirebase";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const UserLogin = () => {
  const { signInWithGoogle, loading, setLoading } = useFirebase();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  // logged in user should be navigated
  useEffect(() => {
    if (localStorage.getItem("userEmail")) {
      navigate("/");
    }
  }, []);

  // info collection of user
  const infoCollection = (e) => {
    const email = e.target.form.email.value;
    const password = e.target.form.password.value;
    setUserEmail(email);
    setUserPassword(password);
  };

  // info submit to server
  const submitFunction = async (e, flag) => {
    try {
      e.preventDefault();
      setErrorMsg("");
      setLoading(false);

      if (flag == "google") {
        // NOTE: receiving and setting accessToken in localStorage from "useFirebase.js" file, in "signInWithGoogle()" function
        signInWithGoogle();
        return;
      }
      if ((userEmail || userPassword) == "") {
        setErrorMsg("Enter credentials");
        return;
      }

      const response = await axios.post(
        "https://baraqah-departmental-store-server.onrender.com/login",
        {
          email: userEmail,
          password: userPassword,
        },
        { withCredentials: true }
      );

      const responseHandleFunc = () => {
        localStorage.setItem("access_token", response.data.accessToken);
        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("role", response.data.role);
        setLoading(true);
        navigate("/");
      };
      console.log(response);
      // handle response
      response.status === 200
        ? responseHandleFunc()
        : window?.alert(response.data, "Login failed, try again!");

      return response;
    } catch (error) {
      console.error("Error during login:", error.response?.data);
      // setErrorMsg(error?.response?.data?.msg);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="w-3/4 hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Ours is one of the best online grocery shops around the city with
            fresh, healthy, pure products along with fast delivery
          </p>
        </div>
        <LoadingSpinner loading={loading} />

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
                onKeyUp={(e) => {
                  infoCollection(e);
                }}
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
                onKeyUp={(e) => {
                  infoCollection(e);
                }}
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
              <button className="btn btn-primary" onClick={submitFunction}>
                Login
              </button>
            </div>
            <button
              className="btn btn-primary"
              onClick={(e) => submitFunction(e, "google")}
            >
              Sign In with google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
