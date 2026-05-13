import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackOrder } from '../services/api';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId) return;
    
    setLoading(true);
    setError('');
    setOrder(null);
    
    const result = await trackOrder(orderId.trim());
    if (result) {
      setOrder(result);
    } else {
      setError('No order found with this ID. Please double check and try again.');
    }
    setLoading(false);
  };

  const getStatusStep = (status) => {
    const steps = ['Processing', 'Shipped', 'Delivered'];
    return steps.indexOf(status);
  };

  const currentStep = order ? getStatusStep(order.status) : -1;

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-10 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-4">Track Your Order</h1>
          <p className="text-slate-500">Enter your order ID to see its current status and estimated delivery.</p>
        </div>

        <form onSubmit={handleTrack} className="relative max-w-lg mx-auto mb-16">
          <input 
            type="text" 
            placeholder="Enter Order ID (e.g. ORD-1234)" 
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full bg-white border-2 border-slate-100 rounded-3xl py-5 px-8 pr-16 text-lg focus:outline-none focus:border-indigo-600 shadow-xl shadow-slate-200/50 transition-all"
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-3 top-3 bottom-3 w-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            {loading ? <Clock className="animate-spin" size={20} /> : <Search size={20} />}
          </button>
        </form>

        <AnimatePresence mode='wait'>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-rose-50 border border-rose-100 p-6 rounded-3xl flex items-center gap-4 text-rose-600"
            >
              <AlertCircle size={24} />
              <p className="font-bold">{error}</p>
            </motion.div>
          )}

          {order && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Order Status Header */}
              <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-50">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">Order #{order.id}</h2>
                    <p className="text-slate-400 mt-1">Placed on {order.date}</p>
                  </div>
                  <div className={`px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest ${
                    order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-600' :
                    order.status === 'Cancelled' ? 'bg-rose-100 text-rose-600' :
                    'bg-indigo-100 text-indigo-600'
                  }`}>
                    {order.status}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative pt-10 pb-4 px-4">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2" />
                  <div 
                    className="absolute top-1/2 left-0 h-1 bg-indigo-600 -translate-y-1/2 transition-all duration-1000" 
                    style={{ width: `${(currentStep / 2) * 100}%` }}
                  />
                  
                  <div className="relative flex justify-between">
                    {[
                      { icon: <Clock />, label: 'Processing' },
                      { icon: <Truck />, label: 'Shipped' },
                      { icon: <CheckCircle />, label: 'Delivered' }
                    ].map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 bg-white z-10 transition-colors duration-500 ${
                          idx <= currentStep ? 'border-indigo-600 text-indigo-600' : 'border-slate-100 text-slate-300'
                        }`}>
                          {step.icon}
                        </div>
                        <span className={`text-xs font-black uppercase tracking-widest ${
                          idx <= currentStep ? 'text-slate-900' : 'text-slate-300'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Info Cards */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-[2rem] p-8 shadow-lg shadow-slate-200/50 border border-slate-50">
                  <h3 className="font-black text-slate-900 mb-6 flex items-center gap-3">
                    <MapPin className="text-indigo-600" size={20} />
                    Delivery Address
                  </h3>
                  <div className="text-slate-500 leading-relaxed">
                    <p className="font-bold text-slate-900 mb-1">{order.customer}</p>
                    <p className="text-sm">{order.address}</p>
                  </div>
                </div>

                <div className="bg-white rounded-[2rem] p-8 shadow-lg shadow-slate-200/50 border border-slate-50">
                  <h3 className="font-black text-slate-900 mb-6 flex items-center gap-3">
                    <Package className="text-indigo-600" size={20} />
                    Order Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Total Amount</span>
                      <span className="font-black text-slate-900">{order.total.toString().replace('$', 'Rs. ')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Payment Method</span>
                      <span className="font-black text-slate-900 uppercase">{order.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TrackOrder;
