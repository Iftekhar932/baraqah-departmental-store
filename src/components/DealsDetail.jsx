import React from "react";

const DealsDetail = () => {
  return (
    <div className="mx-auto flex gap-10 justify-center items-center p-12 ">
      <article className="">
        <h1>
          Hot 🔥<span className="text-[#17827B]"> Deals</span> For You
        </h1>
        <span>
          Baraqah is an online store with 100% organic Healthy foods and 100%
          Fresh products for you
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
            <span></span>
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
            <span></span>
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
            <span></span>
          </div>
        </div>
      </article>
    </div>
  );
};

export default DealsDetail;
