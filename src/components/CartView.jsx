import axios from "axios";
import { useEffect, useState } from "react";

const CartView = () => {
  const [cartProductDisplay, setCartProductDisplay] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("userProducts")) return;
    const products = JSON.parse(localStorage.getItem("userProducts"));

    const fetchCartProducts = async () => {
      const productRequests = products.map((product) => {
        return axios
          .get(`http://localhost:3001/getAllProducts/${product.productId}`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then((response) => {
            const { _id, category, categoryImg, id, img, name, price, unit } =
              response.data[0];

            return {
              id,
              name,
              price,
              unit,
              category,
              categoryImg,
              img,
              qnt: product.qnt,
            };
          })
          .catch((err) => console.log(err, "line 21 product.js"));
      });

      const cartProducts = await Promise.all(productRequests); // axios api call function makes multiple asynchronous calls so used "Promise.all()" to wait for it to finish
      setCartProductDisplay(cartProducts);
    };

    fetchCartProducts();
  }, []);

  if (!cartProductDisplay) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto mx-auto mt-4 w-4/5 p-4 border">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Index</th>
            <th>Category</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cartProductDisplay.map((product, index) => (
            <tr key={product.id}>
              <td className="border">{index + 1}</td>
              <td className="border">{product.category}</td>
              <td className="border">{product.name}</td>
              <td className="border">{product.price}</td>
              <td className="border">{product.unit}</td>
              <td className="border">{product.qnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartView;
