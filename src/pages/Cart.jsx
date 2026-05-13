import React from 'react';
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CreditCard } from "lucide-react";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
    totalPrice
  } = useCart();
  
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900">Your Cart</h1>
            <p className="text-gray-500 mt-2">You have {cart.length} items in your shopping bag.</p>
          </div>
          {cart.length > 0 && (
            <button onClick={clearCart} className="text-sm text-red-500 hover:underline font-bold">
              Clear All Items
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[40px] p-20 text-center shadow-xl border border-gray-100"
          >
            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={48} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
            <p className="text-gray-500 mt-2 mb-8">Looks like you haven't added any toys to your cart yet.</p>
            <Link to="/" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all inline-block shadow-lg shadow-indigo-100">
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* ITEM LIST */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div
                    key={item._id || item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-6 group hover:shadow-md transition-shadow"
                  >
                    <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden shrink-0 border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                      <p className="text-indigo-600 font-black mt-1">Rs. {item.price}</p>
                    </div>

                    {/* QTY CONTROLS */}
                    <div className="flex items-center bg-gray-50 rounded-xl p-1 px-2 border border-gray-100">
                      <button onClick={() => decreaseQty(item._id || item.id)} className="p-1 hover:bg-white rounded-lg transition-all"><Minus size={14}/></button>
                      <span className="w-8 text-center font-bold text-sm">{item.qty}</span>
                      <button onClick={() => increaseQty(item._id || item.id)} className="p-1 hover:bg-white rounded-lg transition-all"><Plus size={14}/></button>
                    </div>

                    <div className="w-20 text-right">
                      <p className="font-black text-gray-900">Rs. {(item.price * item.qty).toFixed(2)}</p>
                    </div>

                    <button onClick={() => removeItem(item._id || item.id)} className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* SUMMARY */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[40px] p-8 shadow-xl border border-gray-100 sticky top-24">
                <h2 className="text-xl font-bold mb-8 text-gray-800">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-bold text-gray-800">Rs. {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span className="text-emerald-500 font-bold">Free</span>
                  </div>
                  <div className="h-[1px] bg-gray-100 my-4"></div>
                  <div className="flex justify-between text-xl font-black text-gray-900">
                    <span>Total</span>
                    <span>Rs. {totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
                  >
                    <CreditCard size={20} />
                    Checkout Now
                  </button>
                  
                  <Link to="/" className="w-full flex items-center justify-center gap-2 py-4 text-gray-400 font-bold hover:text-gray-600 transition-all text-sm">
                    Continue Shopping <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="mt-8 bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
                   <div className="bg-white p-2 rounded-lg">🚀</div>
                   <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                     Free Express Delivery on all orders today!
                   </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;