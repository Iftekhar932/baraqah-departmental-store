import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useLoaderData } from "react-router-dom";

const SliderCategory = () => {
  const loadedData = useLoaderData();
  let imgs = loadedData?.data?.map((imgData) => {
    return imgData.categoryImg;
  });

  return (
    <div className="mx-auto">
      <Carousel
        showThumbs={false}
        dynamicHeight={false}
        infiniteLoop={true}
        autoPlay={false}
        className="w-32 mx-auto"
      >
        {imgs.map((image, index) => (
          <div key={index}>
            <img src={image} alt="" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SliderCategory;
