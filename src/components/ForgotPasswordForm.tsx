import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useFirebase from "../hooks/useFirebase";
import LoadingSpinner from "./LoadingSpinner";

const ForgotPasswordForm = () => {
  const { loading, setLoading } = useFirebase();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  // email & password collection
  const infoCollection = (e) => {
    const email = e.target.form.email.value;
    const password = e.target.form.password.value;
    setUserEmail(email);
    setUserPassword(password);
  };

  const submitFunction = async (e) => {
    try {
      e.preventDefault();
      setErrorMsg("");
      setLoading(true);

      if (!userEmail || !userPassword) {
        setErrorMsg("Enter credentials");
        setLoading(false); // Stop loading if fields are empty
        return;
      }

      const strongPWD =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/;

      // Password validation
      if (!strongPWD.test(userPassword)) {
        setErrorMsg(
          "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
        );
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "https://baraqah-departmental-store-server.onrender.com/passwordReset",
        {
          email: userEmail,
          password: userPassword,
        },
        { withCredentials: true,timeout: 60000 } // ⏳ 60 seconds timeout 
      );

      const successHandler = (msg: string) => {
        window.alert(msg);
        navigate("/");
      };

      // handle response
      response.status === 200
        ? successHandler("SuccessFully Changed")
        : window.alert(`${response?.data}, change failed`);
      return response;
    } catch (error) {
      console.error("Error during submit:", error?.response);
      if (error?.response?.status === 400 || 409) {
        setErrorMsg(error?.response?.data?.msg || "Invalid email or password"); // Handle specific error message
      } else {
        setErrorMsg("An error occurred. Please try again later."); // Generic error message for other cases
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="w-3/4 hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold py-6">Change your password</h1>
        </div>
        {loading ? <LoadingSpinner loading={loading} /> : null}{" "}
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
                placeholder="Type your new password"
                className="input input-bordered"
                name="password"
                onKeyUp={(e) => {
                  infoCollection(e);
                }}
              />
              <label className="label">
                <Link
                  to="/userLogin"
                  className="label-text-alt link link-hover"
                >
                  Login here
                </Link>
                <Link
                  to="/userRegister"
                  className="label-text-alt link link-hover"
                >
                  Don't have an account?
                </Link>
              </label>
            </div>
            {errorMsg && <span className="text-red-500">{errorMsg}</span>}

            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={submitFunction}>
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
