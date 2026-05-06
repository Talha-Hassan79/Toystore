import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Heart } from 'lucide-react';

export default function Trust() {
  const features = [
    { icon: <ShieldCheck size={24} />, text: "100% Safe Toys", color: "text-emerald-500" },
    { icon: <Truck size={24} />, text: "Global Fast Shipping", color: "text-indigo-500" },
    { icon: <RotateCcw size={24} />, text: "30-Day Easy Returns", color: "text-pink-500" },
    { icon: <Heart size={24} />, text: "Loved by Parents", color: "text-amber-500" }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 mb-20">
      <div className="glass rounded-[3.5rem] p-10 md:p-14 border border-white/80 shadow-2xl shadow-indigo-100/20 grid grid-cols-2 md:grid-cols-4 gap-10">
        {features.map((f, idx) => (
          <div key={idx} className="flex flex-col items-center text-center group">
            <div className={`w-16 h-16 rounded-2xl bg-white shadow-xl shadow-slate-100 flex items-center justify-center ${f.color} mb-6 group-hover:scale-110 transition-transform`}>
              {f.icon}
            </div>
            <span className="font-bold text-slate-800 tracking-tight">{f.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}