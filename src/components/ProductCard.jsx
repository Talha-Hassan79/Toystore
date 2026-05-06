import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { Star, ShoppingBag, Eye, Heart } from "lucide-react";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const productId = product._id || product.id;

  const handleAdd = (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    addToCart(product);
    toast.success(`${product.name} added to cart 🛒`, {
      style: {
        borderRadius: '20px',
        background: '#333',
        color: '#fff',
      },
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <motion.div
      layout
      className="group relative bg-white rounded-[2.5rem] p-4 hover-lift border border-slate-100 shadow-sm"
    >
      {/* Wishlist Button */}
      <button 
        onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted); }}
        className={`absolute top-6 right-6 z-20 p-3 rounded-full backdrop-blur-md transition-all duration-300 ${isWishlisted ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' : 'bg-white/80 text-slate-400 hover:text-pink-500'}`}
      >
        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
      </button>

      {/* IMAGE CONTAINER */}
      <Link to={`/product/${productId}`} className="block relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-50 mb-6">
        <img
          src={product.image || "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=400"}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
           <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-xl">
             <Eye size={24} className="text-slate-900" />
           </div>
        </div>
      </Link>

      {/* INFO */}
      <div className="px-2 pb-2">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-lg text-slate-800 line-clamp-1 mb-1">{product.name}</h3>
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Premium Quality</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-slate-900">${product.price}</p>
          </div>
        </div>

        <button
          onClick={handleAdd}
          disabled={loading}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-lg shadow-slate-100 disabled:opacity-50 active:scale-95 group/btn"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <ShoppingBag size={18} className="group-hover/btn:rotate-12 transition-transform" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;