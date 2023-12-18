import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPasswordForm = () => {
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
    setErrorMsg("");
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:3001/passwordReset",
        {
          email: userEmail,
          password: userPassword,
        },
        { withCredentials: true }
      );

      // handle response
      response.status === 200
        ? navigate("/")
        : console.log(response.data, "change failed");
      return response;
    } catch (error) {
      console.error("Error during login line 45:", error.response?.data);
      setErrorMsg(error?.response?.data?.msg);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="w-3/4 hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold py-6">Change your password</h1>
          {/* <p className="py-6">
            Ours is one of the best online grocery shops around the city with
            fresh, healthy, pure products along with fast delivery
          </p> */}
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
