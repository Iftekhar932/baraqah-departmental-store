import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFirebase from "../hooks/useFirebase";
import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  const { user, logOut } = useFirebase();

  const userEmail = localStorage.getItem("userEmail");
  const role = localStorage.getItem("role");

  const logOutFunc = () => {
    if (userEmail) {
      localStorage.removeItem("userEmail");
      localStorage.setItem("access_token", null);
      return;
    } else {
      return logOut();
    }
  };

  return (
    <>
      {/* //* MOBILE 👇 */}
      <div className="navbar mb-5 mx-auto border-b-[.1px] font-thin">
        <div className="dropdown md:invisible">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52`}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <ThemeSwitcher />
          </ul>
        </div>

        {/* //* 👇 LARGE SCREEN */}
        <div className="w-full mx-auto hidden md:flex justify-between">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link className="font-medium text-xl" to="/">
                <span>
                  <span className="text-green-700">Ba</span>
                  raqah
                </span>
              </Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              {user?.email || userEmail ? (
                <a href="#" onClick={logOutFunc}>
                  Logout
                </a>
              ) : (
                <Link to="/userLogin">Sign In</Link>
              )}
            </li>
          </ul>

          <ul className="menu menu-horizontal px-1 items-center">
            {user?.email ||
              (userEmail && (
                <li className="hover:bg-zinc-200">
                  <a href="#">
                    <img
                      src="https://i.ibb.co/vPhPLjL/email-1-svgrepo-com.png"
                      alt="email-1-svgrepo-com"
                      border="0"
                      height="22px"
                      width="22px"
                    />
                    {user?.email || userEmail}
                  </a>
                </li>
              ))}
            <li>
              <ThemeSwitcher />
            </li>
            <li className="bg-gradient-to-r from-zinc-100 to-zinc-50 rounded-full">
              <a title="Favorites">
                <img
                  height="20px"
                  width="20px"
                  src="https://i.ibb.co/yyZvx7c/love-svgrepo-com.png"
                  alt="Favorites"
                  border="0"
                />{" "}
              </a>
            </li>

            <li className="bg-gradient-to-r from-zinc-100 to-zinc-50 rounded-full">
              <Link to="/viewCart" title="Cart">
                <img
                  height="20px"
                  width="20px"
                  src="https://i.ibb.co/5s9HH42/cart-shopping-svgrepo-com.png"
                  alt="cart"
                  border="0"
                />{" "}
              </Link>
            </li>

            {role == "admin" && (
              <li className="bg-gradient-to-r from-zinc-100 to-zinc-50 rounded-full">
                <Link to="/adminOnly" title="Account">
                  <img
                    height="20px"
                    width="20px"
                    src="https://i.ibb.co/GT1KM5g/person-svgrepo-com.png"
                    alt="Account"
                    border="0"
                  />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      {/*  ⬆👆☝👆☝⬆👆☝👆☝⬆👆☝👆☝ FIRST HEADER PART  ⬆👆☝👆☝⬆👆☝👆☝⬆👆☝👆☝    */}
    </>
  );
};

export default Header;
