import React, { useState } from "react";

const useCart = () => {
  const [userCart, setUserCart] = useState([]);

  // Function to get quantity of an item
  const getItemQuantity = (itemId) => {
    let products = localStorage.getItem("userProducts");

    if (!products) return 0; // If no products, return 0

    products = JSON.parse(products);

    const product = products.find(
      (singleProduct) => singleProduct.productId === itemId
    );

    return product ? product.qnt : 0; // Return quantity if found, otherwise 0
  };

  const addItem = (itemId) => {
    let products = localStorage.getItem("userProducts");

    // if products array is not there it'll create one for product list
    if (!products) {
      products = localStorage.setItem(
        "userProducts",
        JSON.stringify([{ productId: itemId, qnt: 1 }])
      );
    }

    // if products array is there then product objects will be added in the array or quantity will be increased of product
    else if (products) {
      products = JSON.parse(products);

      const productQntIncrement = products.find((singleProduct) => {
        if (singleProduct.productId === itemId) return (singleProduct.qnt += 1);
      })
        ? localStorage.setItem("userProducts", JSON.stringify(products))
        : products.push({ productId: itemId, qnt: 1 });

      localStorage.setItem("userProducts", JSON.stringify(products));
    }
  };

  //! testing needed
  const subItem = (itemId) => {
    let products = localStorage.getItem("userProducts");

    // if products array is there then product objects will be added in the array or quantity will be increased
    if (products) {
      products = JSON.parse(products);

      const productQntDecrement = products.findIndex((singleProduct) => {
        return singleProduct.productId === itemId;
      });

      if (productQntDecrement >= 0) products[productQntDecrement].qnt -= 1;

      if (products[productQntDecrement].qnt <= 0) {
        products.splice(productQntDecrement, 1);
      }

      localStorage.setItem("userProducts", JSON.stringify(products));
    }
  };
  return { addItem, subItem, getItemQuantity };
};

export default useCart;
