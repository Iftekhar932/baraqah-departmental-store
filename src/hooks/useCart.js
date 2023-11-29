import React, { useState } from "react";

const useCart = () => {
  const [userCart, setUserCart] = useState([]);

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
  /* 
  const subItem = (itemId) => {
    let products = localStorage.getItem("userProducts");

    // If products array exists, handle product subtraction
    if (products) {
      products = JSON.parse(products);

      const productIndex = products.findIndex(
        (singleProduct) => singleProduct.productId === itemId
      );

      if (productIndex !== -1) {
        const product = products[productIndex];
        product.qnt -= 1;

        // Remove item if quantity reaches 0 or less
        if (product.qnt <= 0) {
          products.splice(productIndex, 1);
        }

        // products[productIndex] = product;
        localStorage.setItem("userProducts", JSON.stringify(products));
      }
    }
  };
 */
  return { addItem, subItem };
};

export default useCart;
