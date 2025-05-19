import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useFirebase from "../hooks/useFirebase";
import LoadingSpinner from "./LoadingSpinner";

// ! implement password criteria

// Regex for strong password: at least 1 uppercase, 1 lowercase, 1 number, 1 special character
/* const strongPWD =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      this.password
    ); */

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
  const submitFunction = async (
    e: React.MouseEvent<HTMLButtonElement>,
    flag: string = ""
  ) => {
    try {
      e.preventDefault();
      setErrorMsg("");
      setLoading(true);

      if (flag == "google") {
        signInWithGoogle();
        return;
      }

      if (!userEmail || !userPassword) {
        setErrorMsg("Credentials Missing");
        setLoading(false); // Stop loading if fields are empty
        return;
      }

      const response = await axios.post(
        "http://localhost:3001/register",
        {
          email: userEmail,
          password: userPassword,
        },
        { withCredentials: true, timeout: 60000 } // ⏳ 60 seconds timeout
      );

      const handleLoginSuccess = () => {
        console.log(response.data, "Registration Successful");
        navigate("/");
      };

      // Handle response
      response.status === 201
        ? handleLoginSuccess()
        : console.log(response.data, "Registration failed");

      return response;
    } catch (error) {
      // console.error("Error during login:", error?.response?.data);
      if (axios.isAxiosError(error)) {
        console.log(error);
        if (error.response) {
          // Handles 401, 403, etc.
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
        console.error("Axios error:", error.message, error.response?.data);
      } else {
        setErrorMsg("An unexpected error occurred.");
        console.error("Unknown error:", error);
      }
    } finally {
      setLoading(false); // ✅ Always stop loading
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
                  to="/userLogin"
                  className="label-text-alt link link-hover"
                >
                  Already have an account?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                onClick={(e) => submitFunction(e)}
              >
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
