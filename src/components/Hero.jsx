import React from "react";
import deliveryImg from "../images/delivery.svg";

const Hero = () => {
  return (
    <div className="">
      <div className="hero ">
        <div className="hero-content flex-col lg:flex-row-reverse min-h-full w-2/4">
          <div className="w-2/4">
            <img
              src={deliveryImg}
              alt="delivery guy"
              className="rounded-full"
            />
          </div>

          <div className="w-2/4">
            <span className="font-semibold text-orange-500">
              Sales up to 20%
            </span>
            <h1 className="text-5xl font-bold">
              <span className="text-green-700">Healthy</span> and{" "}
              <span className="text-green-700">fresh</span> food for you
            </h1>
            <p className="py-6  ">
              Baraqah is an online store with 100% organic Healthy foods and
              100% Fresh products for you
            </p>
            <button className="btn btn-primary">Show Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
