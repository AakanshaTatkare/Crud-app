import React from "react";

const ProductItem = ({ product, onDelete, onUpdate }) => {
  const handleDelete = () => {
    onDelete(product.id);
  };

  const handleEdit = () => {
    onUpdate(product);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text">
          <strong>Price:</strong> ${product.price}
        </p>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
        <button className="btn btn-primary" onClick={handleEdit}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
