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
  ); // initial value is set in the useEffect

  // "theme" attribute is set while this component is rendered
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
