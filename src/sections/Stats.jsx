import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: "10K+", label: "Magical Toys", color: "from-indigo-400 to-indigo-600" },
  { value: "500+", label: "Premium Brands", color: "from-pink-400 to-pink-600" },
  { value: "24hr", label: "Fast Shipping", color: "from-emerald-400 to-emerald-600" },
  { value: "4.9★", label: "Happy Reviews", color: "from-amber-400 to-amber-600" }
];

export default function Stats() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-100 border border-slate-50 text-center overflow-hidden"
          >
            {/* Background Glow */}
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500`} />
            
            <div className={`text-4xl md:text-5xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </div>
            <div className="text-slate-400 mt-4 font-bold text-sm uppercase tracking-widest">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}