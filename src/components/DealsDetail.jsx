import React from "react";

const DealsDetail = () => {
  return (
    <div className="mx-auto p-12 w-2/4 flex gap-10 justify-center items-center">
      <article className="">
        <h1 className="font-bold text-2xl">
          Hot 🔥
          <br /> <span className="text-green-700"> Deals</span> For You
        </h1>
        <span>
          Baraqah is an online store with 100% organic Healthy foods and 100%
          Fresh products for you, safe for health and fresh as ever
        </span>
      </article>
      <article className="">
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
      <article className="">
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
      <article className="">
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
    </div>
  );
};

export default DealsDetail;
