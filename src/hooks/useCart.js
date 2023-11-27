import React, { useState } from "react";

const useCart = () => {
  const [userCart, setUserCart] = useState([]);

  const addItem = (itemId, itemQnt) => {
    console.log("🚀 ~ file: useCart.js:WORKING", itemId);
    let product = localStorage?.getItem("userProducts");
    if (product) {
      product = JSON.parse(product);
      console.log(product);
      product.qnt += 1;
    } else {
      product = { productId: itemId, qnt: 1 };
      localStorage.setItem("userProducts", JSON.stringify(product));
    }
  };

  const subItem = () => {
    let product = localStorage.getItem("userProducts");
    if (product) {
      product = JSON.parse(product);
      product.qnt -= 1;
    }
  };

  return { addItem, subItem };
};

export default useCart;
