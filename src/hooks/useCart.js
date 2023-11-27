import React, { useState } from "react";

const useCart = () => {
  const [userCart, setUserCart] = useState([]);

  const addItem = (itemId, itemQnt) => {
    let products = localStorage.getItem("userProducts");

    // if products array is not there it'll create one for product list
    if (!products) {
      products = localStorage.setItem(
        "userProducts",
        JSON.stringify([{ productId: itemId, qnt: 1 }])
      );
    }

    // if products array is there then product objects will be added in the array or quantity will be increased
    else if (products) {
      products = JSON.parse(products);

      const productQntIncrement = products.find((singleProduct) => {
        if (singleProduct.productId === itemId) return (singleProduct.qnt += 1);
      })
        ? localStorage.setItem("userProducts", JSON.stringify(products))
        : products.push({ productId: itemId, qnt: 1 });

      localStorage.setItem("userProducts", JSON.stringify(products));
      console.log("✨ 🌟  addItem  products:", products);
    }
  };

  // todo testing needed
  const subItem = (itemId) => {
    let products = localStorage.getItem("userProducts");

    // if products array is there then product objects will be added in the array or quantity will be increased
    if (products) {
      products = JSON.parse(products);

      const productQntIncrement = products.find((singleProduct) => {
        if (singleProduct.productId === itemId) return (singleProduct.qnt -= 1);
      });
      if (productQntIncrement.length > 0)
        localStorage.setItem("userProducts", JSON.stringify(products));
      console.log("✨ 🌟  addItem  products:", products);
    }
  };

  return { addItem, subItem };
};

export default useCart;
