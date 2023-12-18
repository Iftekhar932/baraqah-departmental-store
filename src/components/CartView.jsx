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
          .catch((err) => console.log(err, "line 40 cartView.js"));
      });

      /* it calls the api for every product asynchronously, so it makes sure after all promises are resolved it'll be set in 
      "cartTotalSum" state. */
      const cartProducts = await Promise.all(productRequests);

      // adding up all selected products price and setting it to state
      let totalSum = 0;
      for (const product of cartProducts) {
        totalSum += product.price * product.qnt; // e.g: 5x12=60, product price multiplied by quantity
      }

      setCartProductDisplay(cartProducts);
      setCartTotalSum(totalSum); // Update the total sum after fetching products
    };

    fetchCartProducts();
  }, [cartProductDisplay]);

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
                  {/* individual product's total price "toFixed(2)" makes sure e.g: "16.123" will be "16.12"*/}
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
            // clearing and updating the table
            localStorage.clear();
            fetchCartProducts();
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
