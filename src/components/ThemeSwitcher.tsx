import React, { useEffect, useState } from "react";

const themeNames = [
  "light",
  "dark",
  "cupcake",
  "synthwave",
  "garden",
  "forest",
  "pastel",
  "fantasy",
  "luxury",
  "dracula",
  "business",
  "lemonade",
  "night",
  "coffee",
];

const ThemeSwitcher = () => {
  const [userTheme, setUserTheme] = useState(
    window.localStorage.getItem("userSelectedTheme")
  ); // initial value is set in the useEffect

  // "data-theme" attribute is set in HTML tag in "index.html" while this component is rendered in the header
  useEffect(() => {
    document.body.dataset.theme = userTheme;
    setUserTheme(window.localStorage.getItem("userSelectedTheme")); // setting initialValue on state above
  }, [userTheme]);

  // change theme
  const themeValueSetter = (e) => {
    window.localStorage.setItem("userSelectedTheme", e.target.textContent);
    setUserTheme(e.target.textContent);
  };

  return (
    <>
      <ul className="menu menu-horizontal px-1">
        <li>
          <details>
            <summary>Themes</summary>
            <ul className="bg-base-100 overflow-auto max-h-36 w-24 z-10">
              {themeNames.map((themeName, index) => {
                return (
                  <li
                    className="capitalize  cursor-pointer hover:bg-zinc-100"
                    onClick={(e) => themeValueSetter(e)}
                    key={index}
                  >
                    {themeName}
                  </li>
                );
              })}
            </ul>
          </details>
        </li>
      </ul>
    </>
  );
};

export default ThemeSwitcher;
