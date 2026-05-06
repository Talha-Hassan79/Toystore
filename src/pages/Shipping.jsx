import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Globe, Clock, Package } from 'lucide-react';

const Shipping = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-12 md:p-16 shadow-2xl shadow-indigo-100/50"
        >
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-8">
            <Truck size={40} />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Shipping Information</h1>
          <p className="text-lg text-slate-500 mb-12 leading-relaxed">
            We deliver magic right to your doorstep. Here is everything you need to know about our shipping process and delivery times.
          </p>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-indigo-600 font-bold">
                <Globe size={20} />
                <h3>Global Delivery</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                We ship to over 50 countries worldwide. No matter where you are, we'll find a way to bring the joy of ToyStore to your family.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-indigo-600 font-bold">
                <Clock size={20} />
                <h3>Processing Time</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Most orders are processed within 24 hours. During holiday seasons, processing may take up to 48 hours.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-indigo-600 font-bold">
                <Package size={20} />
                <h3>Order Tracking</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Once your order ships, you'll receive a tracking number via email so you can follow its journey to your home.
              </p>
            </div>
          </div>

          <div className="mt-16 pt-10 border-t border-slate-50">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Delivery Rates</h2>
            <div className="overflow-hidden rounded-2xl border border-slate-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase font-black text-[10px] tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Method</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr>
                    <td className="px-6 py-4 font-bold">Standard Shipping</td>
                    <td className="px-6 py-4">5-7 Business Days</td>
                    <td className="px-6 py-4 text-emerald-500 font-bold">FREE</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold">Express Delivery</td>
                    <td className="px-6 py-4">2-3 Business Days</td>
                    <td className="px-6 py-4">$15.00</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold">Magical Overnight</td>
                    <td className="px-6 py-4">Next Day</td>
                    <td className="px-6 py-4">$29.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Shipping;
