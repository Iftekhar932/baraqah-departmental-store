import React from "react";
import { Outlet } from "react-router-dom";
import DealsDetail from "./DealsDetail";
import Hero from "./Hero";

const Home = () => {
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
