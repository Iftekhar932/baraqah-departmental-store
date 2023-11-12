import React from "react";
import { useLoaderData } from "react-router-dom";
import Card from "./Card";

const Cards = () => {
  const loadedData = useLoaderData();
  console.log("✨ 🌟  Cards  data:", loadedData.data);
  return (
    <div className="grid place-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {loadedData.data.map((d) => {
        return <Card key={d._id} productData={d} />;
      })}
    </div>
  );
};

export default Cards;
