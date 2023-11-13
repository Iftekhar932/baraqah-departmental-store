import React from "react";
import { Outlet } from "react-router-dom";
import DealsDetail from "./DealsDetail";
import Header from "./Header";
import Hero from "./Hero";
import CategoriesSlide from "./CategoriesSlide";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <DealsDetail />
      <CategoriesSlide />
      <Outlet />
    </>
  );
};

export default Home;
