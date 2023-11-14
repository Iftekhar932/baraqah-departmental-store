import React, { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const SliderCategory = () => {
  const loadedData = useLoaderData();

  let category = loadedData?.data?.map((image) => {
    return image.category;
  });
  category = [...new Set(category)];

  let imgs = loadedData?.data?.map((image) => {
    return image.categoryImg;
  });
  imgs = [...new Set(imgs)];

  return (
    <>
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
        className="h-64 w-[500px] mx-auto "
      >
        {imgs?.map((img, index) => {
          return (
            <div key={index} className="mr-5">
              <Link to={`${img.category}`}>
                <Link to={`${category[index]}`}>
                  <img src={img} alt="" />
                </Link>
              </Link>
            </div>
          );
        })}
      </Carousel>
    </>
  );
};

export default SliderCategory;
