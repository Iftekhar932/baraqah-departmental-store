import React, { useState } from "react";

const Header = () => {
  const [navVisibilityMobile, setNavVisibilityMobile] = useState(false);
  return (
    <div className="navbar bg-base-100">
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
            {/* <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>

      <div className="hidden w-full  lg:flex justify-between ">
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
          {/*   <li tabIndex={0}>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li> */}
        </ul>

        <ul className="menu menu-horizontal px-1">
          <li>
            <a>
              <img
                src="data:image/jpeg;base64,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"
                width="15px"
                height="15px"
                alt=""
              />{" "}
              +880xx123123123
            </a>
          </li>
          <li>
            <a>
              <img
                src="https://png2.cleanpng.com/sh/1dbf4b1cb6b207a6b98e268d0f06b20e/L0KzQYm3VMI3N6Vvj5H0aYP2gLBuTfNwdaF6jNd7LXnmf7B6Tfxidph6edluLXnmf7A0VfFmOZdnUdgENUS1SIm1VMc2Omk3Sqo6NUK3R4aCVMU2PmI2TJD5bne=/kisspng-computer-icons-language-icon-5ae1fb9f954288.4752822815247594556114.png"
                height="15px"
                width="15px"
                alt=""
                className="rounded"
              />{" "}
              ENG
            </a>
          </li>
          {/*   <li tabIndex={0}>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Header;
