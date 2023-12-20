import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartView = () => {
  const navigate = useNavigate();
  const [cartProductDisplay, setCartProductDisplay] = useState([]); // selected products data to display on table
  const [cartTotalSum, setCartTotalSum] = useState(0); // total due payment of products purchased by user

  // need lexical scope to access everywhere so it's defined outside of useEffect's curly braces
  let fetchCartProducts;

  useEffect(() => {
    if (!localStorage.getItem("userProducts")) return;
    const products = JSON.parse(localStorage.getItem("userProducts"));
    // getting every product by id that is stored in localStorage cart by user
    fetchCartProducts = async () => {
      const productRequests = products?.map(async (product) => {
        console.log(
          "🚀 ~ file: CartView.jsx:19 ~ productRequests ~ product:",
          product
        );
        return axios
          .get(`http://localhost:3001/getAllProducts/${product?.productId}`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then((response) => {
            const { _id, category, categoryImg, id, img, name, price, unit } =
              response?.data[0];

            return {
              id,
              name,
              price,
              unit,
              category,
              categoryImg,
              img,
              qnt: product?.qnt,
            };
          })
          .catch((err) => console.log(err, "line 42 cartView.js"));
      });

      /* This whole function calls the api for every product asynchronously, so it makes sure after all promises are resolved it'll be set in 
      "cartTotalSum" state. */
      const cartProducts = await Promise.all(productRequests);

      // adding up all selected products price and setting it to state
      let totalSum = 0;
      for (const product of cartProducts) {
        totalSum += product?.price * product?.qnt; // e.g: 5x12=60, product price multiplied by quantity
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
      <div className="sm:w-full overflow-x-auto mx-auto mt-4 md:w-4/5 md:p-4 md:h-screen border rounded-md shadow-md">
        <table className="table table-xs w-full h-max text-left">
          <thead>
            <tr>
              <th className="px-2 py-1 border-b border-r table-cell">Index</th>
              <th className="px-2 py-1 border-b border-r table-cell">
                Category
              </th>
              <th className="px-2 py-1 border-b border-r table-cell">
                Product Name
              </th>
              <th className="px-2 py-1 border-b border-r table-cell">Price</th>
              <th className="px-2 py-1 border-b border-r table-cell">Unit</th>
              <th className="px-2 py-1 border-b border-r table-cell">
                Quantity
              </th>
              <th className="px-2 py-1 border-b table-cell">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartProductDisplay.map((product, index) => (
              <tr key={product.id}>
                <td className="px-2 py-1 border-b border-r table-cell">
                  {index + 1}
                </td>
                <td className="px-2 py-1 border-b border-r table-cell">
                  {product.category}
                </td>
                <td className="px-2 py-1 border-b border-r table-cell">
                  {product.name}
                </td>
                <td className="px-2 py-1 border-b border-r table-cell">
                  {product.price}
                </td>
                <td className="px-2 py-1 border-b border-r table-cell">
                  {product.unit}
                </td>
                <td className="px-2 py-1 border-b border-r table-cell">
                  {product.qnt}
                </td>
                <td className="px-2 py-1 border-b table-cell">
                  {(product.qnt * product.price).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="5" className="text-center py-1 border-b"></td>
              <td className="px-2 py-1 border-b text-right table-cell">
                Total
              </td>
              <td className="px-2 py-1 border-b  table-cell">
                {cartTotalSum.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center p-4">
        <button
          className="btn btn-primary mx-auto self-center"
          onClick={() => {
            // clearing and updating the table
            localStorage.removeItem("userProducts");
            navigate("/");
          }}
        >
          Clear All
        </button>
      </div>
    </>
  );
};

export default CartView;
