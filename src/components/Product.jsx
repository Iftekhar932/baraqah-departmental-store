import React from "react";
const Card = (props) => {
  const { category, _id, name, unit, img, price } = props.productData;

  const numberCheck = (e) => {
    if (e.target.value < 0) return (e.target.value = 0);
  };

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={img} className="w-full" alt={name} />
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
          <button className="btn btn-primary">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
