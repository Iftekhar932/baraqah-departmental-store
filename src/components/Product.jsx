import React from "react";
const Product = (props) => {
  const { category, _id, name, unit, img, price } = props.productData;

  const numberCheck = (e) => {
    if (e.target.value < 0) return (e.target.value = 0);
  };

  return (
    <div className="card card-compact min-w-0 w-full bg-base-100 shadow-xl">
      <figure>
        <img src={img} className="w-full h-64 object-cover" alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Category:{category}</p>
        <span>Price: ${price}</span>
        <span>Unit: {unit}</span>
        <input
          type="number"
          placeholder={`Type Quantity measured by ${unit}`}
          onChange={numberCheck}
        />
        <div className="card-actions justify-end">
          <button className="btn btn-primary w-full sm:w-auto">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
