import React, { useState } from "react";
/* 
const imgs = [
  "https://i.ibb.co/TT3rxZq/fish-1.png",
  "https://i.ibb.co/FKpCk7Z/vegetables.png",
  "https://i.ibb.co/KKPqTF1/milk.png",
  "https://i.ibb.co/98T7NSM/meat.png",
  "https://i.ibb.co/y80tfRY/fruits.png",
  "https://i.ibb.co/4S8LwKt/fish.png",
  "https://i.ibb.co/nzFTRg7/soda.png",
  "https://i.ibb.co/KLmWyPP/cake-slice.png",
  "https://i.ibb.co/h13WKSP/bread.png",
]; */

const CategoriesSlide = () => {
  const imgs = [
    "https://i.ibb.co/TT3rxZq/fish-1.png",
    "https://i.ibb.co/FKpCk7Z/vegetables.png",
    "https://i.ibb.co/KKPqTF1/milk.png",
    "https://i.ibb.co/98T7NSM/meat.png",
    "https://i.ibb.co/y80tfRY/fruits.png",
    "https://i.ibb.co/4S8LwKt/fish.png",
    "https://i.ibb.co/nzFTRg7/soda.png",
    "https://i.ibb.co/KLmWyPP/cake-slice.png",
    "https://i.ibb.co/h13WKSP/bread.png",
  ];
  const [current, setCurrent] = useState(2);

  const nextSlide = () => {
    setCurrent(current === imgs.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? imgs.length - 1 : current - 1);
  };

  return (
    <div className="flex items-center justify-center">
      <button onClick={prevSlide} className="btn btn-primary mr-4">
        Prev
      </button>
      <div className="flex space-x-4">
        <img
          src={imgs[(current - 2 + imgs.length) % imgs.length]}
          alt=""
          className="w-16 h-16 md:w-32 md:h-32 object-cover rounded-lg"
        />
        <img
          src={imgs[(current - 1 + imgs.length) % imgs.length]}
          alt=""
          className="w-16 h-16 md:w-32 md:h-32 object-cover rounded-lg"
        />
        <img
          src={imgs[current]}
          alt=""
          className="w-16 h-16 md:w-32 md:h-32 object-cover rounded-lg"
        />
        <img
          src={imgs[(current + 1) % imgs.length]}
          alt=""
          className="w-16 h-16 md:w-32 md:h-32 object-cover rounded-lg"
        />
        <img
          src={imgs[(current + 2) % imgs.length]}
          alt=""
          className="w-16 h-16 md:w-32 md:h-32 object-cover rounded-lg"
        />
      </div>
      <button onClick={nextSlide} className="btn btn-primary ml-4">
        Next
      </button>
    </div>
  );
};

export default CategoriesSlide;
