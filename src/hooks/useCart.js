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
    } /* else {
      const newProduct = products.push({ productId: itemId, qnt: 1 });
      console.log("✨ 🌟  addItem  newProduct:", newProduct);
      localStorage.setItem("userProducts", JSON.stringify(newProduct));
    } */
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
