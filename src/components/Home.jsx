import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Hero from "./Hero";

const Home = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Home;
