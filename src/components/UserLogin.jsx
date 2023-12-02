import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useFirebase from "../hooks/useFirebase";
import axios from "axios";

const UserLogin = () => {
  const { signInWithGoogle, setUser, user } = useFirebase();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();

  const infoCollection = (e) => {
    const email = e.target.form.email.value;
    const password = e.target.form.password.value;
    setUserEmail(email);
    setUserPassword(password);
  };

  const submitFunction = async (e, flag) => {
    try {
      e.preventDefault();
      if (flag == "google") {
        signInWithGoogle();
        return;
      }

      const response = await axios.post(
        "http://localhost:3001/login",
        {
          email: userEmail,
          password: userPassword,
        },
        { withCredentials: true }
      );

      // handle response
      response.status === 200
        ? console.log(
            localStorage.setItem("access_token", response.data.accessToken),
            response.data,
            "login Successful"
          )
        : console.log(response.data, "login failed");

      localStorage.setItem("userEmail", response.data.email);

      navigate("/");

      return response;
    } catch (error) {
      console.error("Error during login:", error);
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
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
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
