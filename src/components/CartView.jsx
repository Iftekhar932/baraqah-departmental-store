import axios from "axios";

const CartView = () => {
  let products = JSON.parse(localStorage?.getItem("userProducts"));

  products.map((product) => {
    const response = axios
      .get(`http://localhost:3001/getAllProducts/${product.productId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        const { _id, category, categoryImg, id, img, name, price, unit } =
          response.data[0];
        console.log(response.data[0]);
      })
      .catch((err) => console.log(err, "line 21 product.js"));

    return response;
  });

  let cartProductsDisplay = (
    <>
      <tr>
        <td>{category}</td>
        <td>{name}</td>
        <td>{price}</td>
        <td>{unit}</td>
      </tr>
    </>
  );

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>company</th>
            <th>location</th>
            <th>Last Login</th>
            <th>Favorite Color</th>
          </tr>
        </thead>
        {/* <tbody>{productsToDisplay}</tbody> */}
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>company</th>
            <th>location</th>
            <th>Last Login</th>
            <th>Favorite Color</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CartView;
