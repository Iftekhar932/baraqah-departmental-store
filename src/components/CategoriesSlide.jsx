import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

const CategoriesSlide = () => {
  const loadedData = useLoaderData();

  let imgs = loadedData?.data?.map((imgData) => {
    return imgData.categoryImg;
  });
  imgs = [...new Set(imgs)]; //preventing duplicate elements

  const [current, setCurrent] = useState(2);

  // makes sure if it is the last item then it doesn't go more that that and goes back to the first item again, e.g: items.length =8, it won't let index become 9
  const nextSlide = () => {
    setCurrent(current === imgs.length - 1 ? 0 : current + 1);
  };
  // vice-versa of nextSlide
  const prevSlide = () => {
    setCurrent(current === 0 ? imgs.length - 1 : current - 1);
  };

  return (
    <div>
      <div className="flex justify-between w-3/4 mx-auto">
        <span className="font-bold">Categories</span>
        <span className="text-green-700 text-lg">View All</span>
      </div>
      <div className="flex items-center justify-center">
        <button onClick={prevSlide} className="btn btn-primary mr-4">
          Prev
        </button>
        <div className="flex space-x-4">
          <img
            src={imgs[(current - 2 + imgs.length) % imgs.length]}
            alt=""
            className="w-16 h-16 sm:w-32 sm:h-32 object-cover rounded-lg"
          />
          <img
            src={imgs[(current - 1 + imgs.length) % imgs.length]}
            alt=""
            className="w-16 h-16 sm:w-32 sm:h-32 object-cover rounded-lg"
          />
          <img
            src={imgs[current]}
            alt=""
            className="w-16 h-16 sm:w-32 sm:h-32 object-cover rounded-lg"
          />
          <img
            src={imgs[(current + 1) % imgs.length]}
            alt=""
            className="w-16 h-16 sm:w-32 sm:h-32 object-cover rounded-lg"
          />
          <img
            src={imgs[(current + 2) % imgs.length]}
            alt=""
            className="w-16 h-16 sm:w-32 sm:h-32 object-cover rounded-lg"
          />
        </div>
        <button onClick={nextSlide} className="btn btn-primary ml-4">
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoriesSlide;
