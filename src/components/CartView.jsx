import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { refreshHandlingFunction } from "../Routes/routes";

let fetchCartProducts;

const CartView = () => {
  const navigate = useNavigate();
  const [cartProductDisplay, setCartProductDisplay] = useState([]); // selected products data to display on table
  const [cartTotalSum, setCartTotalSum] = useState(0); // total due payment of products purchased by user

  // a function that makes a list in .txt file format and auto downloads it in user's device, this is done without having access to user's storage
  const handleDownload = () => {
    const filename = "purchase-confirmation.txt";
    let fileContent = "";

    for (let i = 0; i < cartProductDisplay.length; i++) {
      const element = cartProductDisplay[i];
      console.log(element);
      fileContent += `
      Product: ${element?.name}
       Price: $ ${element?.price} 
       Quantity: ${element?.qnt} 
       ------- ------`;
    }

    /* 
new Blob - it is making a file like object
createObjectURL - makes temporary download URL for the file that is created */
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    /* creating a button while adding href & download attribute to it, after that it is clicked by itself which makes the it download the file automatically */
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url); // revokeObjectURL releases memory, prevents memory leaks.
  };

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
          .catch(async (err) => {
            console.log(err, "line 42 cartView.js");
            console.log(err?.response);
            if (err?.response?.status === 403) {
              return await refreshHandlingFunction(
                null,
                "component - CartView.jsx ------- api - getAllProducts/:productId",
                true
              );
            }
            /* refreshHandlingFunction(
              `http://localhost:3001/getAllProducts/${product?.productId}`
            ); */
          });
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
      <div className="min-h-screen">
        <div className="sm:w-full overflow-x-auto mx-auto mt-4 md:w-4/5 md:p-4 border rounded-md shadow-md">
          <table className="table table-xs w-full h-max text-left">
            <thead>
              <tr>
                <th className="px-2 py-1 border-b border-r table-cell">
                  Index
                </th>
                <th className="px-2 py-1 border-b border-r table-cell">
                  Category
                </th>
                <th className="px-2 py-1 border-b border-r table-cell">
                  Product Name
                </th>
                <th className="px-2 py-1 border-b border-r table-cell">
                  Price
                </th>
                <th className="px-2 py-1 border-b border-r table-cell">Unit</th>
                <th className="px-2 py-1 border-b border-r table-cell">
                  Quantity
                </th>
                <th className="px-2 py-1 border-b table-cell">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartProductDisplay?.map((product, index) => (
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
          <button
            className="btn btn-primary mx-auto self-center"
            onClick={() => {
              // clearing and updating the table
              navigate("/");
              handleDownload();
              localStorage.removeItem("userProducts");
            }}
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    </>
  );
};

export default CartView;
