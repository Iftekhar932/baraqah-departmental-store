import React from "react";
import axios from "axios";
import useCart from "../hooks/useCart";
import { refreshHandlingFunction } from "../Routes/routes";
import { motion } from "framer-motion";

const Product = (props) => {
  const { category, _id, name, unit, img, price } = props?.productData;
  const { addItem, subItem } = useCart();

  // get product id and add it to localStorage cart with "addItem/subitem" function

  const itemSelection = async (_id, flag) => {
    const response = await axios
      .get(
        `https://baraqah-departmental-store-server.onrender.com/getAllProducts/${_id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        // flag indicates whether to use  addition or subtraction function
        if (flag === true) {
          return subItem(response?.data[0]?._id);
        } else {
          return addItem(response?.data[0]?._id);
        }
      })
      .catch(async (err) => {
        console.log(err?.response);
        if (err?.response?.status === 403) {
          return await refreshHandlingFunction(
            null,
            "component - products.jsx ------- api - getAllProducts/:productId",
            true
          );
        }
      });
    return response;
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
};

export default Product;
