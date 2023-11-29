import axios from "axios";

const CartView = () => {
  let products = JSON.parse(localStorage?.getItem("userProducts"));

  products.map(async (product, index) => {
    const response = await axios
      .get(`http://localhost:3001/getAllProducts/${product.productId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .catch((err) => console.log(err, "line 21 product.js"));
    const { _id, category, categoryImg, id, img, name, price, unit } =
      response.data;

    const cartProductsDisplay = (
      <>
        <tr>
          <th>{index}</th>
          <td></td>
          <td>{category}</td>
          <td></td>
          <td>{name}</td>
          <td>{price}</td>
          <td>{unit}</td>
        </tr>
      </>
    );
  });

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
        <tbody>{products}</tbody>
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
