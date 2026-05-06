import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('toy_store_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900">My Orders</h1>
            <p className="text-gray-500 mt-2">Track and manage your magical purchases.</p>
          </div>
          <Link to="/" className="text-indigo-600 font-bold hover:underline flex items-center gap-2">
            <ShoppingBag size={18} /> Continue Shopping
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-[40px] p-20 text-center shadow-xl shadow-indigo-100/50">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package size={40} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">No orders yet</h2>
            <p className="text-gray-500 mt-2 mb-8">Your order history is currently empty.</p>
            <Link to="/" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all inline-block shadow-lg shadow-indigo-100">
              Find Your First Toy
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-indigo-50 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Package size={28} />
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900">{order.id}</h3>
                      <p className="text-sm text-gray-400">{order.date}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-8">
                    <div className="text-center md:text-left">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                      <div className="flex items-center gap-2">
                        {order.status === 'Processing' ? (
                          <span className="flex items-center gap-1.5 text-amber-500 text-sm font-bold">
                            <Clock size={14} /> Processing
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-emerald-500 text-sm font-bold">
                            <CheckCircle size={14} /> {order.status}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-center md:text-left">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total</p>
                      <p className="font-black text-gray-900">${order.total.toFixed(2)}</p>
                    </div>

                    <button className="bg-gray-50 hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 p-3 rounded-xl transition-all">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
