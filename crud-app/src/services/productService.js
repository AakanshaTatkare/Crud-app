import axios from "axios";

const API_URL = "https://dummyjson.com/products";

export const getProducts = async (limit, skip, searchQuery = "") => {
  try {
    const response = await axios.get(
      `${API_URL}?limit=${limit}&skip=${skip}&search=${searchQuery}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, product);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
