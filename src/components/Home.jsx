import React from "react";
import { Outlet } from "react-router-dom";
import DealsDetail from "./DealsDetail";
import Hero from "./Hero";

const Home = () => {
  return (
    <>
      <Hero />
      <DealsDetail />
      <Outlet />
    </>
  );
};

export default Home;
