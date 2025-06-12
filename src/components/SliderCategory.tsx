import { Link, Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { JWTExpiryHandlerFunction } from "../Routes/routes";
import { ProductDataStructure } from "../types/interfaces";
import useFirebase from "../hooks/useFirebase";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

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
  const { category } = useParams<{ category?: string }>();
  const { loading, setLoading } = useFirebase();
  const [data, setData] = useState<ProductDataStructure[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    let url =
      "https://baraqah-departmental-store-server.onrender.com/getAllProducts";
    JWTExpiryHandlerFunction(url, "SliderCategory.tsx - API getAllProducts")
      .then((res: any) => {
        setData(res?.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load categories.");
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, [setLoading]);

  // collecting category names while preventing clone element in the array
  const categoryNames = Array.from(
    new Set(data?.map((image) => image.category))
  );
  const imgs = Array.from(new Set(data?.map((image) => image.categoryImg)));

  if (loading) return <LoadingSpinner loading={loading} />;
  if (error) return <div>{error}</div>;
  if (!data.length) return <div>No categories found.</div>;

  return (
    <motion.div
      className={`${data?.length === 0 ? "hidden" : ""}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 1 } }}
    >
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={true}
        infinite={true}
        responsive={responsive}
        ssr={true}
        autoPlaySpeed={10000}
        autoPlay={true}
        keyBoardControl={true}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
        className="h-64 mx-auto md:w-[500px]"
      >
        {imgs?.map((img, index) => (
          <div
            key={index}
            className="tooltip m-10 md:mr-5 lg:mr-0"
            data-tip={categoryNames[index]}
          >
            <Link to={`products/${categoryNames[index]}`}>
              <img src={img} alt={categoryNames[index]} loading="lazy" />
            </Link>
          </div>
        ))}
      </Carousel>
      <Outlet />
    </motion.div>
  );
};

export default SliderCategory;
