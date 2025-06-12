import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { JWTExpiryHandlerFunction } from "../Routes/routes";
import { ProductDataStructure } from "../types/interfaces";
import useFirebase from "../hooks/useFirebase";
import Carousel from "react-multi-carousel";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const SliderCategory = () => {
  const { loading, setLoading } = useFirebase();
  const [data, setData] = useState<ProductDataStructure[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    JWTExpiryHandlerFunction(
      "https://baraqah-departmental-store-server.onrender.com/getAllProducts",
      "SliderCategory.tsx - API getAllProducts"
    )
      .then((res: any) => {
        setData(res?.data?.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load categories.");
        setLoading(false);
      });
  }, [setLoading]);

  // Get unique categories and their images
  const categoriesMap = new Map<string, string>();
  data.forEach((item) => {
    if (!categoriesMap.has(item.category)) {
      categoriesMap.set(item.category, item.categoryImg);
    }
  });
  const categoryNames = Array.from(categoriesMap.keys());
  const imgs = Array.from(categoriesMap.values());

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
        {categoryNames.map((cat, index) => (
          <div
            key={cat}
            className="tooltip m-10 md:mr-5 lg:mr-0"
            data-tip={cat}
          >
            <Link to={`products/${cat}`}>
              <img src={imgs[index]} alt={cat} loading="lazy" />
            </Link>
          </div>
        ))}
      </Carousel>
      <Outlet />
    </motion.div>
  );
};

export default SliderCategory;
