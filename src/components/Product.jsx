import React, { useState } from "react";
import axios from "axios";
import useCart from "../hooks/useCart";

const Product = (props) => {
  const { category, _id, name, unit, img, price } = props.productData;
  const { addItem, subItem } = useCart();
  const [itemQnt, setItemQnt] = useState(0);

  const numberCheck = (e) => {
    if (e.target.value < 0) setItemQnt(e.target.value);
    return (e.target.value = 0);
  };

  const itemSelection = async (_id, flag) => {
    const response = await axios
      .get(`http://localhost:3001/getAllProducts/${_id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        if (flag == true) {
          return subItem(response.data[0]._id);
        } else {
          return addItem(response.data[0]._id);
        }
      })
      .catch((err) => console.log(err, "line 21 product.js"));
    return response;
  };

  return (
    <div className="card card-compact min-w-0 w-full bg-base-100 shadow-xl">
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
    </div>
  );
};

export default Product;
