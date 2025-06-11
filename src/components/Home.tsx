import React from "react";
import { Outlet } from "react-router-dom";
import DealsDetail from "./DealsDetail";
import Hero from "./Hero";

const Home = () => {
  React.useEffect(() => {
    console.log("Home component mounted");
    fetch(
      "https://baraqah-departmental-store-server.onrender.com/getAllProducts"
    )
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  return (
    <>
      <Hero />
      <DealsDetail />
      {/* outlet used for "SliderCategory.jsx" component */}
      <Outlet />
    </>
  );
};

export default Home;
