import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFirebase from "../hooks/useFirebase";
// daisyUI component
import ThemeSwitcher from "./ThemeSwitcher";
import { createCartUpdatedHandler } from "../utils/Handler";

const Header = () => {
  const [activateAnimation, setActivateAnimation] = useState<boolean>(false);
  const { user, logOut } = useFirebase();

  const userEmail: null | string = localStorage.getItem("userEmail");
  const role: null | string = localStorage.getItem("role");

  useEffect(() => {
    const products: { productId: string; qnt: number }[] = JSON.parse(
      localStorage.getItem("userProducts") || "[]"
    );
    if (Array.isArray(products) && products.length > 0) {
      setActivateAnimation(true);
    } else {
      setActivateAnimation(false);
    }

    const handler = createCartUpdatedHandler(setActivateAnimation);
    window.addEventListener("cartUpdated", handler);

    return () => {
      window.removeEventListener("cartUpdated", handler);
    };
  }, []);

  const logOutFunc = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    flag: boolean = false
  ) => {
    //?what should the return type of this function
    if (!flag) {
      ["userEmail", "access_token", "userProducts", "role"].forEach((key) =>
        localStorage.removeItem(key)
      );
    } else if (flag) {
      e.preventDefault();
      localStorage.removeItem("userEmail");
      localStorage.removeItem("access_token");
      localStorage.removeItem("userProducts");
      localStorage.removeItem("role");
      await logOut();
    }
  };

  return (
    <>
      <div className="navbar justify-between mb-5 mx-auto border-b-[.1px] font-thin">
        {/* //* MOBILE 👇 */}
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li className={` ${userEmail || user?.email ? "" : "hidden"}`}>
              <span>Logged in: {user?.email || userEmail}</span>
            </li>

            {role == "admin" && (
              <li className="rounded-full">
                <Link to="/adminOnly" title="Accounts">
                  <img
                    height="20px"
                    width="20px"
                    src="https://i.ibb.co/GT1KM5g/person-svgrepo-com.png"
                    alt="Accounts"
                    style={{ border: "0" }}
                  />
                  Admin Panel
                </Link>
              </li>
            )}
            <li className="rounded-full">
              <Link to="/viewCart" title="Cart">
                <img
                  height="20px"
                  width="20px"
                  src="https://i.ibb.co/5s9HH42/cart-shopping-svgrepo-com.png"
                  alt="cart"
                  style={{ border: "0" }}
                />{" "}
                Cart
              </Link>
            </li>
            <ThemeSwitcher />

            {Boolean(userEmail) || user?.email ? (
              <li className="bg-red-700">
                <a
                  href=""
                  onClick={(e) => {
                    if (user?.email) {
                      return logOutFunc(e, true);
                    } else {
                      return logOutFunc(e);
                    }
                  }}
                >
                  Logout
                </a>
              </li>
            ) : (
              <li>
                <Link to="/userLogin">Sign In</Link>
              </li>
            )}
          </ul>
        </div>
        <span className="font-bold sm:hidden">Baraqah</span>
        {/* //* MOBILE 👆 */}

        {/* //* 👇 LARGE SCREEN */}
        <div className="w-full mx-auto hidden md:flex justify-between ">
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
              {Boolean(userEmail) || user?.email ? (
                <a
                  href=""
                  onClick={(e) => {
                    if (user?.email) {
                      return logOutFunc(e, true);
                    } else {
                      return logOutFunc(e);
                    }
                  }}
                >
                  Logout
                </a>
              ) : (
                <Link to="/userLogin">Sign In</Link>
              )}
            </li>
          </ul>
          <ul className="menu menu-horizontal px-1 items-center">
            {/* "user?.email" is for google account sign in (firebase) || "userEmail" is manually email account signed in */}
            <li className={` ${userEmail || user?.email ? "" : "hidden"}`}>
              <a href="">
                <img
                  src="https://i.ibb.co/vPhPLjL/email-1-svgrepo-com.png"
                  alt="email-1-svgrepo-com"
                  style={{ border: "0" }}
                  height="22px"
                  width="22px"
                />
                {user?.email || userEmail}
              </a>
            </li>
            <li>
              <ThemeSwitcher />
            </li>

            <li
              className={`border border-purple-700 rounded-full ${
                activateAnimation ? "animate-bounceTwice" : ""
              }`}
            >
              <Link to="/viewCart" title="Cart">
                <img
                  height="20px"
                  width="20px"
                  src="https://i.ibb.co/5s9HH42/cart-shopping-svgrepo-com.png"
                  alt="cart"
                  style={{ border: "0" }}
                />{" "}
              </Link>
            </li>

            {role == "admin" && (
              <li className="border border-purple-700 rounded-full">
                <Link to="/adminOnly" title="Accounts">
                  <img
                    height="20px"
                    width="20px"
                    src="https://i.ibb.co/GT1KM5g/person-svgrepo-com.png"
                    alt="Accounts"
                    style={{ border: "0" }}
                  />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      {/*  ⬆👆☝👆☝⬆👆☝👆☝⬆👆☝👆☝  //* LARGE SCREEN *\\  ⬆👆☝👆☝⬆👆☝👆☝⬆👆☝👆☝    */}
    </>
  );
};

export default Header;
