import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Rocket, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Mesh Elements */}
      <div className="mesh-bg" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/50 mb-8 shadow-sm">
              <Sparkles className="text-pink-500" size={16} />
              <span className="text-xs font-bold tracking-widest uppercase text-slate-600">New 2024 Collection</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black leading-tight text-slate-900 mb-6">
              Unlock the <span className="text-gradient">Magic</span> of Playful Learning
            </h1>
            
            <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-lg">
              Discover a curated collection of premium toys designed to spark imagination, creativity, and endless joy for your little ones.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-premium bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-bold flex items-center justify-center gap-3 shadow-xl shadow-slate-200 hover:shadow-indigo-200 group"
              >
                Shop Collection
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-premium glass text-slate-700 px-10 py-5 rounded-[2rem] font-bold border border-white/80 hover:bg-white/80"
              >
                Our Stats
              </button>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                  <Rocket size={20} />
                </div>
                <span className="text-sm font-bold text-slate-600">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-pink-500">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-sm font-bold text-slate-600">Safe for Kids</span>
              </div>
            </div>
          </motion.div>
          
          {/* Image Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 animate-floating">
              <div className="bg-gradient-to-br from-indigo-500/20 to-pink-500/20 rounded-[4rem] p-4 backdrop-blur-sm border border-white/30">
                <img 
                  src="/hero-toys.png" 
                  alt="Premium Toys" 
                  className="rounded-[3rem] shadow-2xl shadow-indigo-500/20 w-full object-cover"
                />
              </div>
            </div>
            
            {/* Decorative Blobs */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-400/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-400/20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}