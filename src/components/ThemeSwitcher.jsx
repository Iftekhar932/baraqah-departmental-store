import React, { useEffect, useState } from "react";

const themeNames = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

const ThemeSwitcher = () => {
  const [userTheme, setUserTheme] = useState(
    window.localStorage.getItem("userSelectedTheme")
  );
  //
  useEffect(() => {
    document.body.dataset.theme = userTheme;
    setUserTheme(window.localStorage.getItem("userSelectedTheme"));
  }, [userTheme]);

  const themeValueSetter = (e) => {
    window.localStorage.setItem("userSelectedTheme", e.target.textContent);
    setUserTheme(e.target.textContent);
  };

  return (
    <>
      {/* <div className="join join-vertical">
      <div className="flex-none z-10"> */}
      <ul className="menu menu-horizontal px-1 ">
        <li>
          <details>
            <summary>Themes</summary>
            <ul className="bg-base-100 overflow-auto max-h-32 z-10">
              {themeNames.map((themeName) => {
                return (
                  <li
                    className="capitalize  cursor-pointer hover:bg-zinc-100"
                    onClick={(e) => themeValueSetter(e)}
                  >
                    {themeName}
                  </li>
                );
              })}
            </ul>
          </details>
        </li>
      </ul>
      {/* </div>
    </div> */}
    </>
  );
};

export default ThemeSwitcher;
