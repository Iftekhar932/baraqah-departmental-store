import axios from "axios";
import { useEffect, useState } from "react";

const CartView = () => {
  const [cartProductDisplay, setCartProductDisplay] = useState([]);
  const [cartTotalSum, setCartTotalSum] = useState(0);

  let fetchCartProducts;

  useEffect(() => {
    if (!localStorage.getItem("userProducts")) return;
    const products = JSON.parse(localStorage.getItem("userProducts"));

    fetchCartProducts = async () => {
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
          .catch((err) => console.log(err, "line 35 product.js"));
      });

      const cartProducts = await Promise.all(productRequests);
      let totalSum = 0;
      for (const product of cartProducts) {
        totalSum += product.price * product.qnt;
      }

      setCartProductDisplay(cartProducts);
      setCartTotalSum(totalSum); // Update the total sum after fetching products
    };

    fetchCartProducts();
  }, []);

  if (!cartProductDisplay) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
              <th>Total</th>
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
                <td className="border">
                  {(product.qnt * product.price).toFixed(2)}
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan="5"></td>
              <td className="border">Total</td>
              <td className="border">{cartTotalSum.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center p-4">
        <button
          className="btn btn-primary mx-auto self-center"
          onClick={() => {
            localStorage.clear();
            fetchCartProducts();
          }}
        >
          Clear All
        </button>
      </div>
    </>
  );
};

export default CartView;
