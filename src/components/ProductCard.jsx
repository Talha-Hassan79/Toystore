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
    if (loading) return;

    setLoading(true);

    addToCart(product);

    toast.success(`${product.name} added to cart 🛒`);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const badge =
    product.price > 60
      ? "Premium"
      : product.price > 35
      ? "Best Seller"
      : "New";

  return (
    <motion.div
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.25 }}
      className="
      group
      bg-white
      rounded-[34px]
      overflow-hidden
      border
      shadow-md
      hover:shadow-2xl
      transition-all
      duration-300
      "
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">

        <img
          src={product.image}
          alt={product.name}
          className="
          h-56
          w-full
          object-cover
          group-hover:scale-110
          duration-500
          "
        />

        {/* Badge */}
        <span
          className="
          absolute top-4 left-4
          bg-white/95
          backdrop-blur
          rounded-full
          px-4 py-2
          text-xs font-bold
          shadow
          "
        >
          {badge}
        </span>


        {/* Hover Overlay */}
        <div
          className="
          absolute inset-0
          bg-black/35
          opacity-0
          group-hover:opacity-100
          transition
          flex items-center justify-center
          "
        >
          <motion.button
            whileTap={{ scale: .95 }}
            onClick={handleAdd}
            className="
            bg-white
            text-black
            px-6 py-3
            rounded-2xl
            font-semibold
            shadow-lg
            "
          >
            {loading ? "Adding..." : "Quick Add"}
          </motion.button>
        </div>

      </div>

      {/* CONTENT */}
      <div className="p-6">

        {/* Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-yellow-500 text-sm">
            ★★★★★
          </div>

          <span className="text-xs text-gray-500">
            124 reviews
          </span>
        </div>


        <h2 className="font-bold text-xl line-clamp-1 mb-2">
          {product.name}
        </h2>


        <p className="text-gray-500 text-sm mb-4">
          Educational & fun toy for curious kids.
        </p>


        {/* PRICE */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl font-black text-indigo-600">
            ${product.price}
          </span>

          <span className="line-through text-gray-400 text-sm">
            ${(product.price * 1.2).toFixed(0)}
          </span>
        </div>


        {/* ACTION BUTTONS */}
        <div className="flex gap-3">

          <Link
            to={`/product/${product._id}`}
            className="
            flex-1
            text-center
            border
            border-gray-200
            py-3
            rounded-2xl
            font-medium
            hover:bg-gray-50
            transition
            "
          >
            View
          </Link>


          <button
            onClick={handleAdd}
            disabled={loading}
            className="
            flex-1
            bg-indigo-600
            text-white
            py-3
            rounded-2xl
            font-semibold
            hover:bg-indigo-700
            transition
            disabled:opacity-70
            "
          >
            {loading ? "..." : "Add"}
          </button>

        </div>

      </div>
    </motion.div>
  );
};

export default ProductCard;