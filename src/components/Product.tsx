import React, { useEffect, useState } from "react";
import axios from "axios";
import useCart from "../hooks/useCart";
import { refreshHandlingFunction } from "../Routes/routes";
import { motion } from "framer-motion";

import { ProductDataStructure } from "../types/interfaces";


interface CardProps {
  productData: ProductDataStructure;
}

const Product = React.memo(({productData}:CardProps) => {
  const { category, _id, name, unit, img, price } = productData;
  const { addItem, subItem, getItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const initialQuantity = getItemQuantity ? getItemQuantity(_id) : 0;
    setQuantity(initialQuantity);
  }, [_id, getItemQuantity]);

  // get product id and add it to localStorage cart with "addItem/subitem" function
  const itemSelection = async (_id: string, flag: boolean = false) => {
    if (flag) {
      subItem(_id);
      setQuantity((prev) => Math.max(prev - 1, 0));
    } else {
      addItem(_id);
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <motion.div
      className="card card-compact min-w-0 w-full bg-base-100 shadow-xl"
      animate={{
        scale: [0.5, 1.1, 1],
        borderRadius: ["20%", "10%", "5%"],
      }}
    >
      <figure>
        <img src={img} className="w-full h-64 object-cover" alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Category:{category}</p>
        <span>Price: ${price}</span>
        <span>Unit: {unit}</span>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary w-full sm:w-auto"
            onClick={() => itemSelection(_id)}
          >
            +{" "}
          </button>
          <span className="text-lg font-bold px-4">{quantity}</span>
          <button
            className="btn btn-primary w-full sm:w-auto"
            onClick={() => itemSelection(_id, true)}
          >
            -{" "}
          </button>
        </div>
      </div>
    </motion.div>
  );
});

export default Product;
