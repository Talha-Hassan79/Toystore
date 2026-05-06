import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Lock, ShieldCheck, ArrowRight, ToyBrick } from "lucide-react";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdminAuth = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simple gatekeeper check
    // In a real app, this would be an API call
    setTimeout(() => {
      if (password === 'admin123') {
        toast.success('Access Granted. Redirecting to Admin Portal...');
        window.location.href = 'http://localhost:5174';
      } else {
        toast.error('Invalid Admin Password');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-500/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-[40px] p-10 shadow-2xl border border-slate-700/50">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/20">
              <ShieldCheck className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-black text-white mb-2">Admin Access</h1>
            <p className="text-slate-400 text-sm">Please enter the security password to continue.</p>
          </div>

          <form onSubmit={handleAdminAuth} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 ml-1">Admin Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-slate-900 transition-all text-sm text-white"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Verify & Enter
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-700/50 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-sm text-slate-500 hover:text-white transition-colors"
            >
              Back to Store
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
