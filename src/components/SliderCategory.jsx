import { Link, Outlet, useLoaderData } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import useFirebase from "../hooks/useFirebase";
import { useEffect, useState } from "react";

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
  const { user } = useFirebase();
  const loadedData = useLoaderData();
  console.log("✨ 🌟  SliderCategory  loadedData:", loadedData);

  // If there's no data, don't render the component
  // ? removing this condition won't solve...
  if (!loadedData?.data?.length) {
    return null;
  }

  let category = loadedData?.data?.map((image) => {
    return image.category;
  });
  category = [...new Set(category)];

  let imgs = loadedData?.data?.map((image) => {
    return image.categoryImg;
  });
  imgs = [...new Set(imgs)];

  return (
    <div>
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={true}
        infinite={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        autoPlaySpeed={1000}
        keyBoardControl={true}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
        className="h-64 w-[500px] mx-auto"
      >
        {imgs?.map((img, index) => {
          return (
            <div key={index} className="mr-5">
              <Link
                to={`products/${category[index]}`}
                title={`${category[index]}`}
              >
                <img src={img} alt="" />
              </Link>
            </div>
          );
        })}
      </Carousel>
      <Outlet />
    </div>
  );
};

export default SliderCategory;
