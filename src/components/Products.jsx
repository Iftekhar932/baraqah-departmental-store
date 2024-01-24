import { useLoaderData } from "react-router-dom";
import Card from "./Product";
import useFirebase from "../hooks/useFirebase";
import LoadingSpinner from "./LoadingSpinner";
import { useEffect, useState } from "react";
import {
  JWTExpiryHandlerFunction,
  refreshHandlingFunction,
} from "../Routes/routes";

const Cards = () => {
  const { loading, setLoading } = useFirebase();
  const [loadedData, setLoadedData] = useState([]);
  const loaderData = useLoaderData([]); // categoryWise data loaded

  // this function is mainly used for loading all products data in "products" route, fetching from this component
  const initialDataFetcher = () => {
    JWTExpiryHandlerFunction(
      "https://baraqah-departmental-store-server.onrender.com/getAllProducts",
      "Products.jsx - API - getAllProducts"
    )
      .then((data) => {
        setLoading(false);
        setLoadedData(data);
        setLoading(Boolean(loadedData?.data[0]));
      })
      .catch(async (err) => {
        console.log(err?.response);
        if (err?.response?.status === 403) {
          return await refreshHandlingFunction(
            null,
            "Products.jsx || api - getAllProducts",
            true
          );
        }
      });
  };

  /* 
  Since nested components and parent component in createBrowserRouter invokes loader function
  simultaneously, used useEffect inside this component instead of loader function in  "route.js" file's createBrowserRouter
  */
  useEffect(() => {
    if (!loaderData?.data[0]) {
      initialDataFetcher();
    }
    if (loaderData?.data[0]) {
      setLoadedData(loaderData);
    }
  }, [loaderData, loading]);

  return (
    <>
      <LoadingSpinner loading={loading} />
      <div className="mx-auto my-5 w-4/5 gap-5 grid  mt-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loadedData?.data?.map((d) => {
          return <Card key={d?._id} productData={d} />;
        })}
      </div>
    </>
  );
};

export default Cards;
