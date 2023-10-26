import React from "react";
import Card from "./Card";

const Cards = () => {
  return (
    <div className="grid place-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default Cards;
