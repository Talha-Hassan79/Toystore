import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    setLoading(true);
    addToCart(product);
    toast.success("Added to cart 🛒");
    setTimeout(() => setLoading(false), 400);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      className="group bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-44 w-full object-cover group-hover:scale-105 transition duration-300"
        />

        {/* QUICK ADD OVERLAY */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <button
            onClick={handleAdd}
            className="bg-white text-black px-4 py-2 rounded-xl font-semibold"
          >
            {loading ? "Adding..." : "Quick Add"}
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h2 className="font-semibold text-lg line-clamp-1">
          {product.name}
        </h2>

        <p className="text-indigo-600 font-bold text-lg mt-1">
          ${product.price}
        </p>

        {/* ACTIONS */}
        <div className="flex gap-2 mt-4">
          <Link
            to={`/product/${product._id}`}
            className="flex-1 text-center border border-gray-200 py-2 rounded-xl hover:bg-gray-100 transition"
          >
            View
          </Link>

          <button
            onClick={handleAdd}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            {loading ? "..." : "Add"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;