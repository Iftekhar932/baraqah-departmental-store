import React, { useState } from "react";
import axios from "axios";
import useCart from "../hooks/useCart";

const Product = (props) => {
  const { category, _id, name, unit, img, price } = props.productData;
  const { addItem, subItem } = useCart();
  const [itemQnt, setItemQnt] = useState(0);

  const numberCheck = (e) => {
    // todo test it if it is ok to use without Number() to make sure it's number input value
    if (e.target.value < 0) setItemQnt(e.target.value);
    return (e.target.value = 0);
  };

  const itemSelection = (_id) => {
    const response = axios
      .get(`http://localhost:3001/getAllProducts/${_id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        return addItem(response.data[0]._id);
      })
      .catch((err) => console.log(err, "line 21 product.js"));
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
        <input
          type="number"
          placeholder={`Type Quantity measured by ${unit}`}
          onChange={numberCheck}
        />
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary w-full sm:w-auto"
            onClick={() => itemSelection(_id)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
