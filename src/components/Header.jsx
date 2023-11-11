import React, { useState } from "react";
import logoImg from "../images/logo.png";

const Header = () => {
  const [navVisibilityMobile, setNavVisibilityMobile] = useState(false);
  return (
    <>
      <div className="navbar bg-white  mb-5 mx-auto border-b-[0.5] font-thin">
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
        <div className="hidden w-3/4 mx-auto  lg:flex justify-between ">
          <ul className="menu menu-horizontal px-1 ">
            <li>
              <a>Feedback</a>
            </li>
            <li>
              <a>Contact Us</a>
            </li>
            <li>
              <a>Faq</a>
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

      {/* 👇👇👇👇👇👇👇👇👇 SECOND HEADER PART  👇👇👇👇👇👇👇👇👇    */}
      <div className="navbar bg-white mb-5 mx-auto border-b-2 font-thin">
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
          <ul className="menu menu-horizontal px-1 w-full justify-end place-items-center gap-4">
            <li>
              <a className="font-medium text-xl" href="#">
                <span>
                  <span className="text-[#17827B]">Ba</span>
                  raqah
                </span>
              </a>
            </li>
            <li>
              <a>Feedback</a>
            </li>
            <li>
              <select className="bg-[#faf7f5]">
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
                className="bg-[#f4f4f5] p-2 "
              />
            </li>
          </ul>

          <ul className="menu menu-horizontal px-1 place-self-end	w-full justify-end">
            <li>
              <a>
                <img
                  height="20px"
                  width="20px"
                  src="https://i.ibb.co/yyZvx7c/love-svgrepo-com.png"
                  alt="love-svgrepo-com"
                  border="0"
                />{" "}
              </a>
            </li>

            <li>
              <a>
                <img
                  height="20px"
                  width="20px"
                  src="https://i.ibb.co/5s9HH42/cart-shopping-svgrepo-com.png"
                  alt="cart-shopping-svgrepo-com"
                  border="0"
                />{" "}
              </a>
            </li>

            <li>
              <a>
                <img
                  height="20px"
                  width="20px"
                  src="https://i.ibb.co/GT1KM5g/person-svgrepo-com.png"
                  alt="person-svgrepo-com"
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
