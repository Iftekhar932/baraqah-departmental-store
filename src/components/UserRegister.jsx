import React from "react";
import { Link } from "react-router-dom";
import useFirebase from "../hooks/useFirebase";

const UserRegister = () => {
  const { signUpWithEmailFunc } = useFirebase();
  const infoCollection = (e) => {};

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
                onBlur={(e) => {
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
                onBlur={(e) => {
                  infoCollection(e);
                }}
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
                <Link
                  to="/userLogin"
                  className="label-text-alt link link-hover"
                >
                  Already have an account?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
