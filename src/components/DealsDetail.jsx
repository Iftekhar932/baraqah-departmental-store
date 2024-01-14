import React from "react";
import { motion } from "framer-motion";

const DealsDetail = () => {
  return (
    <motion.div
      className="mx-auto w-full sm:w-2/5 md:w-3/4 p-12 flex flex-col sm:flex-row gap-10 justify-center items-center place-items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 2 } }}
    >
      <article className="w-full block">
        <h1 className="font-bold text-2xl">
          Hot 🔥
          <br /> <span className="text-green-700"> Deals</span> For You
        </h1>
        <span>
          Baraqah is an online store with 100% organic Healthy foods and 100%
          Fresh products for you, safe for health and fresh as ever
        </span>
      </article>
      <article className="w-full">
        <div>
          <div className="flex-col">
            <img
              src="https://i.ibb.co/cwgcKfK/6022668-clean-covid-hands-healthy-protect-icon.png"
              alt=""
              width="50px"
            />
            <span>Fresh</span>
            <span>Product is fresher than other stores</span>
          </div>
        </div>
      </article>
      <article className="w-full">
        <div>
          <div className="flex-col">
            <img
              src="https://i.ibb.co/Lkb81QJ/4786848-food-fresh-fruit-healthy-meal-icon.png"
              alt=""
              width="50px"
            />
            <span>Healthy</span>
            <span>The healthiest organic food is safe for health</span>
          </div>
        </div>
      </article>
      <article className="w-full">
        <div>
          <div className="flex-col">
            <img
              src="https://i.ibb.co/hXKzzN0/1034366-speed-fast-stopwatch-timer-icon.png"
              alt=""
              width="50px"
            />
            <span>Fast</span>
            <span>Enjoy shopping for the fastest delivery ever</span>
          </div>
        </div>
      </article>
    </motion.div>
  );
};

export default DealsDetail;
