import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [navVisibilityMobile, setNavVisibilityMobile] = useState(false);
  return (
    <>
      {/* //* MOBILE 👇 */}
      <div className="navbar  mb-5 mx-auto border-b font-thin">
        <div
          className="dropdown"
          onClick={() => setNavVisibilityMobile(!navVisibilityMobile)}
        >
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${
              !navVisibilityMobile && "hidden"
            }`}
          >
            <li>
              <a>Feedback</a>
            </li>
            <li>
              <a>Contact us</a>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </div>
        {/* //* 👇 LARGE SCREEN */}
        <div className="hidden w-3/4 mx-auto  lg:flex justify-between ">
          <ul className="menu menu-horizontal px-1 ">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a>Contact Us</a>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>

          <ul className="menu menu-horizontal px-1">
            <li>
              <a>
                <img
                  height="20px"
                  width="20px"
                  src="https://i.ibb.co/wdC8yq1/telephone-svgrepo-com.png"
                  alt="telephone-svgrepo-com"
                  border="0"
                />
                +880xx123123123
              </a>
            </li>
            <li>
              <a>
                <img
                  height="20px"
                  width="20px"
                  src="https://i.ibb.co/mHCTrmh/language-svgrepo-com.png"
                  alt="language-svgrepo-com"
                  border="0"
                />
                ENG
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/*  ⬆👆☝👆☝⬆👆☝👆☝⬆👆☝👆☝ FIRST HEADER PART  ⬆👆☝👆☝⬆👆☝👆☝⬆👆☝👆☝    */}

      {/*  👇👇👇👇👇👇👇👇👇 SECOND HEADER PART  👇👇👇👇👇👇👇👇👇    */}
      <div className="navbar mb-5 mx-auto border-b font-thin">
        {/* //* MOBILE */}
        <div className="">
          <div
            className="dropdown"
            onClick={() => setNavVisibilityMobile(!navVisibilityMobile)}
          >
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${
                !navVisibilityMobile && "hidden"
              }`}
            >
              <li>
                <a>Feedback</a>
              </li>
              <li>
                <a>Contact us</a>
              </li>
              <li>
                <a>FAQ</a>
              </li>
            </ul>
          </div>
          {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
        </div>

        <div className="hidden w-3/4 mx-auto  lg:flex justify-between">
          {/* //*LARGE SCREEN */}
          <ul className="menu menu-horizontal px-1 w-full justify-end place-items-center gap-4">
            <li>
              <Link className="font-medium text-xl" to="/">
                <span>
                  <span className="text-green-700">Ba</span>
                  raqah
                </span>
              </Link>
            </li>
            <li>
              <a href="#">Feedback</a>
            </li>
            <li>
              <select className="">
                <option defaultValue="">Choose location</option>
                <option>Dhaka</option>
                <option>Rajshahi</option>
                <option>Khulna</option>
              </select>
            </li>
            <li>
              <input
                type="text"
                placeholder="Search products &#128269;"
                className="p-2 "
              />
            </li>
          </ul>

          <ul className="menu menu-horizontal px-1 place-self-end	w-full justify-end">
            <li>
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

            <li>
              <a title="Cart">
                <img
                  height="20px"
                  width="20px"
                  src="https://i.ibb.co/5s9HH42/cart-shopping-svgrepo-com.png"
                  alt="cart"
                  border="0"
                />{" "}
              </a>
            </li>

            <li>
              <a title="Account">
                <img
                  height="20px"
                  width="20px"
                  src="https://i.ibb.co/GT1KM5g/person-svgrepo-com.png"
                  alt="Account"
                  border="0"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
