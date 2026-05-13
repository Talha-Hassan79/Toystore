import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, X, ShoppingCart, User, LogOut, Package, Sparkles } from "lucide-react";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // If user starts searching from a different page, take them to the shop home
    if (value && location.pathname !== '/') {
      navigate('/');
    }

    // Auto-scroll to products section so results are visible immediately
    if (value) {
      setTimeout(() => {
        const element = document.getElementById('products');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <div className="fixed top-6 left-0 w-full z-50 px-6">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-7xl mx-auto glass rounded-[2.5rem] shadow-2xl shadow-indigo-500/5 border border-white/50 px-6 py-4"
      >
        <div className="flex justify-between items-center gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Sparkles className="text-white" size={20} />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900 hidden sm:block">Toy<span className="text-indigo-600">Store</span></span>
          </Link>

          {/* Search Bar - Glass Style */}
          <div className="flex-1 max-w-md relative hidden md:block">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Find magic toys..." 
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-slate-100/50 border border-transparent rounded-2xl py-3 pl-12 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link to="/cart" className="relative p-3 hover:bg-slate-100 rounded-2xl transition-all group">
              <ShoppingCart size={22} className="text-slate-700" />
              {cart?.length > 0 && (
                <span className="absolute top-1 right-1 bg-pink-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                  {cart.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/orders" className="p-3 hover:bg-slate-100 rounded-2xl transition-all text-slate-600" title="My Orders">
                  <Package size={22} />
                </Link>
                <div className="relative group/profile">
                  <button className="flex items-center gap-3 bg-slate-900 text-white p-1.5 pr-4 rounded-2xl transition-all hover:bg-indigo-600">
                    <div className="w-8 h-8 rounded-xl overflow-hidden bg-white/20">
                      <img src={user.avatar} alt={user.name} />
                    </div>
                    <span className="text-xs font-bold hidden lg:block">{user.name.split(' ')[0]}</span>
                  </button>
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-3xl shadow-2xl border border-slate-50 opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible transition-all py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-50 mb-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account</p>
                      <p className="text-xs font-bold text-slate-700 truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-500 font-bold hover:bg-rose-50 transition-all"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-sm font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;