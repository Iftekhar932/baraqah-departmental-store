import React from "react";
import { useLoaderData } from "react-router-dom";
import Card from "./Card";

const Cards = () => {
  const loadedData = useLoaderData();

  return (
    <div className="mx-auto gap-5 grid mt-12  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:w-3/4">
      {loadedData.data.map((d) => {
        return <Card key={d._id} productData={d} />;
      })}
    </div>
  );
};

export default Cards;
