import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Card from "./Product";
import axios from "axios";

const Cards = () => {
  const [categoryProductData, setCategoryProductData] = useState([]);
  const loadedData = useLoaderData();
  console.log("🚀 ~ file: Products.jsx:9 ~ Cards ~ loadedData:", loadedData);
  const { category } = useParams();

  return (
    <div className="mx-auto gap-5 grid mt-12  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:w-3/4">
      {loadedData?.data?.map((d) => {
        return <Card key={d._id} productData={d} />;
      })}
    </div>
  );
};

export default Cards;
