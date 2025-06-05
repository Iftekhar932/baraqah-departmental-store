import { Link, Outlet, useLoaderData } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { motion } from "framer-motion";
import { ProductDataStructure } from "../types/interfaces";
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
  const { loading, setLoading } = useFirebase();
  const loadedData = useLoaderData() as { data: ProductDataStructure[] };

  // If there's no data, don't render the component and set loading true
  if (loadedData?.data?.length == 0) {
    setLoading(true);
    return null;
  }

  // collecting category names while preventing clone element in the array
  const category = Array.from(
    new Set(loadedData?.data?.map((image) => image.category))
  );
  const imgs = Array.from(
    new Set(loadedData?.data?.map((image) => image.categoryImg))
  );

  return (
    <motion.div
      className={`${loadedData?.data?.length === 0 ? "hidden" : ""}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 1 } }}
    >
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={true}
        infinite={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        autoPlaySpeed={10000}
        autoPlay={true}
        keyBoardControl={true}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
        className="h-64 mx-auto md:w-[500px]"
      >
        {/* while looping over "imgs" getting the 
          elements of "category" array with "map()'s index, e.g map(element,index)"  
          index is increasing by 1 with every element,
          so  basically putting it like this "category[index]", I get all the elements of "category" array at the same time in this way
          */}

        {imgs?.map((img, index) => {
          return (
            <div
              key={index}
              className="tooltip m-10 md:mr-5 lg:mr-0"
              data-tip={category[index]}
            >
              <Link to={`products/${category[index]}`}>
                <img src={img} alt={category[index]} loading="lazy" />
              </Link>
            </div>
          );
        })}
      </Carousel>
      {/* used outlet to display products on clicking on the products icon */}
      <Outlet />
    </motion.div>
  );
};

export default SliderCategory;
