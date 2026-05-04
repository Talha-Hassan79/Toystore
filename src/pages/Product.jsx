import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { getProductById, getProducts } from "../services/api";
import { useCart } from "../context/CartContext";
import { Star, Truck, ShieldCheck, ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react";
import ProductCard from "../components/ProductCard";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      setLoading(true);
      const found = await getProductById(id);
      setProduct(found);
      
      if (found) {
        const allProducts = await getProducts();
        setRelated(allProducts.filter(p => (p._id || p.id) !== id).slice(0, 4));
      }
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 animate-pulse">
        <div className="h-8 bg-gray-200 w-1/4 mb-10 rounded"></div>
        <div className="grid lg:grid-cols-2 gap-14">
          <div className="h-[540px] bg-gray-200 rounded-[36px]"></div>
          <div className="space-y-6">
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <Link to="/" className="text-indigo-600 hover:underline mt-4 inline-block">Back to Shop</Link>
      </div>
    );
  }

  const addItem = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
    toast.success(`Added ${qty} items to cart! 🛒`);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-bold">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* LEFT GALLERY */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[36px] overflow-hidden shadow-2xl border border-gray-100 p-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[540px] object-cover rounded-[28px]"
            />
          </motion.div>

          {/* RIGHT BUY BOX */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[38px] shadow-xl border border-gray-50 p-10"
          >
            <span className="inline-block bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest mb-4">
              {product.category || 'Featured'}
            </span>

            <h1 className="text-4xl font-black leading-tight text-gray-900">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />)}
              </div>
              <span className="text-sm text-gray-500 font-medium">(124 Verified Reviews)</span>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <div className="text-4xl font-black text-indigo-600">${product.price}</div>
              <div className="line-through text-gray-300 text-xl font-bold">${(product.price * 1.25).toFixed(0)}</div>
            </div>

            <p className="mt-8 text-gray-500 leading-relaxed text-sm">
              Discover the joy of play with our premium {product.name}. 
              Crafted with high-quality materials to ensure safety and endless hours of creative fun for your little ones.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-3 text-xs text-gray-600 bg-gray-50 p-3 rounded-2xl">
                <ShieldCheck size={20} className="text-emerald-500" />
                <span>Child Safe Materials</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-600 bg-gray-50 p-3 rounded-2xl">
                <Truck size={20} className="text-indigo-500" />
                <span>Fast Global Shipping</span>
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold text-gray-900">Quantity</span>
                <div className="flex items-center bg-gray-100 rounded-2xl p-1">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all"><Minus size={16} /></button>
                  <span className="w-12 text-center font-black">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all"><Plus size={16} /></button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={addItem}
                  className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition-all active:scale-95"
                >
                  <ShoppingCart size={20} />
                  Add To Cart
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RELATED PRODUCTS */}
        <section className="mt-24">
          <h2 className="text-3xl font-black mb-10 text-gray-900">You Might Also Like</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {related.map((p) => (
              <ProductCard key={p._id || p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Product;