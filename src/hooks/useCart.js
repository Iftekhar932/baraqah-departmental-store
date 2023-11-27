import React, { useState } from "react";

const userCart = () => {
  const [userCart, setUserCart] = useState([]);

  const addItem = () => {
    let product = localStorage.getItem("userProducts");
    if (product) {
      product = JSON.parse(product);
      product.qnt += 1;
    } else {
      product = { product: "eta", qnt: 1 };
    }
    localStorage.setItem("userProducts", JSON.stringify(product));
  };

  const subItem = () => {
    let product = localStorage.getItem("userProducts");
    if (product) {
      product = JSON.parse(product);
      product.qnt -= 1;
    } else {
      product = { product: "eta", qnt: 1 };
    }
    localStorage.setItem("userProducts", JSON.stringify(product));
  };

  return { addItem, subItem };
};

export default userCart;
