import { Link, Outlet, useLoaderData } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import useFirebase from "../hooks/useFirebase";

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

  // If there's no data, don't render the component
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
    <div className={`${loadedData?.data?.length === 0 ? "hidden" : ""}`}>
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
        className="h-64 mx-auto md:w-[500px]"
      >
        {/* while I'm looping over "imgs" I'm getting the 
        elements of "category" array with "map()'s index, e.g map(element,index)"  
        index is increasing by 1 with every element,
         so I'm basically putting it like this "category[index]", I get all the elements of "category" array at the same time in this way
        */}
        {imgs?.map((img, index) => {
          return (
            <div key={index} className="m-10 md:mr-5 lg:mr-0">
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
