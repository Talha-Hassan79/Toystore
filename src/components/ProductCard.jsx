import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { Star, ShoppingBag } from "lucide-react";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  if (!product) return null;

  // Handle both _id and id for backend consistency
  const productId = product._id || product.id;

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
      layout
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image || "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=400"}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-110 duration-700 transition-transform"
        />

        {/* Badge */}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider shadow-sm z-10">
          {badge}
        </span>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
           <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            className="bg-white text-black p-4 rounded-full shadow-2xl hover:bg-indigo-600 hover:text-white transition-colors"
          >
            <ShoppingBag size={24} />
          </motion.button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-[10px] text-gray-400 ml-1 font-bold">4.9 (124)</span>
        </div>

        <h2 className="font-bold text-lg line-clamp-1 mb-1 text-gray-800">
          {product.name}
        </h2>
        <p className="text-gray-400 text-xs mb-4 line-clamp-1 italic">
          Premium quality toy for creative kids
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-indigo-600">
              ${product.price}
            </span>
            <span className="text-[10px] line-through text-gray-300 font-bold">
              ${(product.price * 1.25).toFixed(0)}
            </span>
          </div>

          <Link
            to={`/product/${productId}`}
            className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600 transition-colors py-2"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;