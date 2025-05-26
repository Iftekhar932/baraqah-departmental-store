import { useCallback } from "react";

type Product = {
  productId: string;
  qnt: number;
};

const useCart = () => {
  const getStoredProducts = (): Product[] => {
    try {
      const data = localStorage.getItem("userProducts");
      return data ? (JSON.parse(data) as Product[]) : [];
    } catch (error) {
      console.error("Failed to parse cart data", error);
      return [];
    }
  };

  const saveProducts = (products: Product[]) => {
    localStorage.setItem("userProducts", JSON.stringify(products));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const getItemQuantity = useCallback((itemId: string): number => {
    const products = getStoredProducts();
    const product = products.find((p) => p.productId === itemId);
    return product?.qnt ?? 0;
  }, []);

  const addItem = (itemId: string) => {
    const products = getStoredProducts();
    const existingProduct = products.find((p) => p.productId === itemId);

    if (existingProduct) {
      existingProduct.qnt += 1;
    } else {
      products.push({ productId: itemId, qnt: 1 });
    }

    saveProducts(products);
  };

  const subItem = (itemId: string) => {
    const products = getStoredProducts();
    const index = products.findIndex((p) => p.productId === itemId);

    if (index >= 0) {
      products[index].qnt -= 1;

      if (products[index].qnt <= 0) {
        products.splice(index, 1);
      }

      saveProducts(products);
    }
  };

  return {
    addItem,
    subItem,
    getItemQuantity,
  };
};

export default useCart;
