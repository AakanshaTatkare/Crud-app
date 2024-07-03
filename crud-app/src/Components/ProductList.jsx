import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getProducts,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import ProductItem from "./ProductItem";
import ProductForm from "./ProductForm";
import _ from "lodash";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchMoreProducts = useCallback(
    _.throttle(async (reset = false) => {
      if (loading) return;
      setLoading(true);
      const limit = 7;
      const newSkip = reset ? 0 : skip;
      try {
        const newProducts = await getProducts(limit, newSkip, searchQuery);
        setProducts((prevProducts) =>
          reset
            ? newProducts.products
            : [...prevProducts, ...newProducts.products]
        );
        setSkip(newSkip + limit);
        if (newProducts.products.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    }, 2000),
    [loading, skip, searchQuery]
  );

  useEffect(() => {
    fetchMoreProducts(true);
  }, [searchQuery]);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdate = async (id, updatedProduct) => {
    try {
      const updatedData = await updateProduct(id, updatedProduct);
      setProducts(
        products.map((product) => (product.id === id ? updatedData : product))
      );
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="form-control mb-3"
      />
      {editingProduct && (
        <ProductForm
          onUpdate={handleUpdate}
          product={editingProduct}
          onCancelEdit={handleCancelEdit}
        />
      )}
      <InfiniteScroll
        dataLength={products.length}
        next={() => fetchMoreProducts(false)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more products</p>}
      >
        <div className="container">
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-md-4">
                <ProductItem
                  product={product}
                  onDelete={handleDelete}
                  onUpdate={handleEdit}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ProductList;
