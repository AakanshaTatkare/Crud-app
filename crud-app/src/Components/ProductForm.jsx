import React, { useState, useEffect } from "react";

const ProductForm = ({ onUpdate, product, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(product.id, formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          className="form-control"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={onCancelEdit}
      >
        Cancel
      </button>
    </form>
  );
};

export default ProductForm;
