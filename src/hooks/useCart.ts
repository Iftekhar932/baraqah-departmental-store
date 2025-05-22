const useCart = () => {
  // 🟦🟦🟦🟦🟦🟦🟦Function to get quantity of an item🟦🟦🟦🟦🟦🟦🟦
  const getItemQuantity = (itemId: string): number => {
    // ? i want to know why doesn't it display any compile error even if the variable is assigned with null? if i want it to display error i should use generic type right "<>"?
    let products: { productId: string; qnt: number }[] = JSON.parse(
      localStorage.getItem("userProducts")
    );

    if (!products) return 0;

    const product = products.find(
      (singleProduct) => singleProduct.productId === itemId
    );

    return product ? product.qnt : 0; // Return quantity if found, otherwise 0
    // return product ? () => product.qnt : 0; // Return quantity if found, otherwise 0
  };

  // 🟦🟦🟦🟦🟦🟦🟦 Function to add item to cart 🟦🟦🟦🟦🟦🟦🟦🟦
  const addItem = (itemId: string) => {
    const productsToParse: string | null =
      localStorage?.getItem("userProducts");
    let products: { productId: string; qnt: number }[] = productsToParse
      ? JSON.parse(productsToParse)
      : [];

    // if products array is not there it'll create one for product list
    if (!productsToParse) {
      products = [{ productId: itemId, qnt: 1 }];
      localStorage.setItem("userProducts", JSON.stringify(products));
      window.dispatchEvent(new Event("cartUpdated"));
    }

    // if products array is there then product objects will be added in the array or quantity will be increased of product
    else if (productsToParse) {
      products = JSON.parse(productsToParse);

      const productQntIncrement = products.find((singleProduct) => {
        if (singleProduct.productId === itemId) return (singleProduct.qnt += 1);
      })
        ? localStorage.setItem("userProducts", JSON.stringify(products))
        : products.push({ productId: itemId, qnt: 1 });

      localStorage.setItem("userProducts", JSON.stringify(products));
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  // 🟦🟦🟦🟦🟦🟦🟦 Function to subtract item from cart 🟦🟦🟦🟦🟦🟦🟦🟦
  const subItem = (itemId: string) => {
    let products: { productId: string; qnt: number }[];

    // if products array is there then product objects will be added in the array or quantity will be increased
    if (localStorage?.getItem("userProducts")) {
      products = JSON.parse(localStorage?.getItem("userProducts"));

      const productQntDecrement = products.findIndex((singleProduct) => {
        return singleProduct.productId === itemId;
      });

      if (productQntDecrement >= 0) products[productQntDecrement].qnt -= 1;

      if (products[productQntDecrement].qnt <= 0) {
        products.splice(productQntDecrement, 1);
      }

      localStorage.setItem("userProducts", JSON.stringify(products));
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };
  return {
    addItem,
    subItem,
    getItemQuantity,
  };
};

export default useCart;
