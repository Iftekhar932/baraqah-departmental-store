import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//! basic logic is done needs testing and have to see what to do after password is reset
const ForgotPasswordForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

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
      console.log("✨ 🌟  submitFunction  response:", response);

      /* const responseHandleFunc = () => {
        localStorage.setItem("access_token", response.data.accessToken);
        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("role", response.data.role);
        navigate("/");
      }; */

      // handle response
      response.status === 200
        ? responseHandleFunc()
        : console.log(response.data, "login failed");
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
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            {/*      Ours is one of the best online grocery shops around the city with
            fresh, healthy, pure products along with fast delivery */}
            admin@gmail.com
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
                placeholder="Type your new password"
                className="input input-bordered"
                name="password"
                onKeyUp={(e) => {
                  infoCollection(e);
                }}
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
              onClick={(e) => submitFunction(e)}
            >
              Sign In with google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
