import React from "react";
import { Outlet } from "react-router-dom";
import DealsDetail from "./DealsDetail";
import Header from "./Header";
import Hero from "./Hero";

const Home = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Hero />
      <DealsDetail />
    </>
  );
};

export default Home;
