import axios from "axios";
import toast from "react-hot-toast";

const API = "http://localhost:3000";

export const getProducts = async () => {
  try {
    const res = await axios.get(`${API}/products`);
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    toast.error("Failed to load products. Please check if the server is running.");
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${API}/products/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    toast.error("Product details could not be loaded.");
    return null;
  }
};