import React from "react";

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
  return (
    <div className="join join-vertical">
      {/* <input
        type="radio"
        name="theme-buttons"
        className="btn theme-controller join-item"
        aria-label="Default"
        value="default"
      />
      <input
        type="radio"
        name="theme-buttons"
        className="btn theme-controller join-item"
        aria-label="Retro"
        value="retro"
      />
      <input
        type="radio"
        name="theme-buttons"
        className="btn theme-controller join-item"
        aria-label="Cyberpunk"
        value="cyberpunk"
      />
      <input
        type="radio"
        name="theme-buttons"
        className="btn theme-controller join-item"
        aria-label="Valentine"
        value="valentine"
      />
      <input
        type="radio"
        name="theme-buttons"
        className="btn theme-controller join-item"
        aria-label="Aqua"
        value="aqua"
      /> */}
      {themeNames.map((themeName) => {
        return (
          <input
            type="radio"
            name="theme-buttons"
            className="btn theme-controller join-item"
            aria-label={`${themeName}`}
            value={`${themeName}`}
          />
        );
      })}
    </div>
  );
};

export default ThemeSwitcher;
