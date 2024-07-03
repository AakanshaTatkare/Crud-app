// src/App.js
import React, { useState } from "react";
import "./App.css";
import ProductList from "./Components/ProductList";
import ProductForm from "./Components/ProductForm";

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <div className="App">
      <div className="container mt-4">
        <h1 className="mb-4">CRUD Application with Infinite Scroll</h1>
        <ProductForm onAddProduct={addProduct} />
        <ProductList />
      </div>
    </div>
  );
}

export default App;
