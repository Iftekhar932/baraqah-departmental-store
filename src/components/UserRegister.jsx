import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFirebase from "../hooks/useFirebase";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const UserRegister = () => {
  const { signInWithGoogle, loading, setLoading } = useFirebase();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  // logged in user should be navigated
  if (localStorage.getItem("userEmail")) {
    navigate("/");
  }

  // info collection of user
  const infoCollection = (e) => {
    const email = e.target.form.email.value;
    const password = e.target.form.password.value;
    setUserEmail(email);
    setUserPassword(password);
  };

  // info submit to server
  const submitFunction = async (e, flag) => {
    setErrorMsg("");
    try {
      e.preventDefault();
      if (flag == "google") {
        signInWithGoogle();
        return;
      }

      const response = await axios.post("http://localhost:3001/register", {
        email: userEmail,
        password: userPassword,
      });

      const handleLoginSuccess = () => {
        console.log(response.data, "login Successful");
        navigate("/");
      };

      // Handle response
      response.status === 201
        ? handleLoginSuccess()
        : console.log(response.data, "login failed");

      return response;
    } catch (error) {
      console.error("Error during login:", error.response.data);
      setErrorMsg(error.response.data.msg);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="w-3/4  hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Ours is one of the best online grocery shops around the city with
            fresh, healthy, pure products along with fast delivery
          </p>
        </div>
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
                  to="/userLogin"
                  className="label-text-alt link link-hover"
                >
                  Already have an account?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={submitFunction}>
                Register
              </button>
            </div>
            <button
              className="btn btn-primary"
              onClick={(e) => submitFunction(e, "google")}
            >
              Sign In with google
            </button>
            <LoadingSpinner loading={loading} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
