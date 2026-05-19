import axios from "axios";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

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
  }
};

export const createOrder = async (orderData) => {
  try {
    const res = await axios.post(`${API}/orders`, orderData);
    return res.data;
  } catch (error) {
    console.error("Error creating order:", error);
    toast.error("Failed to place order.");
    return null;
  }
};

export const trackOrder = async (id) => {
  try {
    const res = await axios.get(`${API}/orders/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error tracking order:", error);
    return null;
  }
};

export const getOrdersByEmail = async (email) => {
  try {
    const res = await axios.get(`${API}/orders`, { params: { email } });
    return res.data;
  } catch (error) {
    console.error("Error fetching orders by email:", error);
    return [];
  }
};
