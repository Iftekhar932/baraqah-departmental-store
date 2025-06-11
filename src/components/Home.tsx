import React from "react";
import { Outlet } from "react-router-dom";
import DealsDetail from "./DealsDetail";
import Hero from "./Hero";
import { JWTExpiryHandlerFunction } from "../Routes/routes";

const Home = () => {
  React.useEffect(() => {
    console.log("Home component mounted");
    JWTExpiryHandlerFunction(
      "https://baraqah-departmental-store-server.onrender.com/getAllProducts",
      "SliderCategory.jsx €- API getAllProducts"
    );
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
