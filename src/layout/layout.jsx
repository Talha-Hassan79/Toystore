import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-grow"
      >
        {children}
      </motion.main>
      
      <footer className="bg-white border-t border-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-black text-indigo-600 mb-4">🧸 ToyStore</h3>
            <p className="text-slate-500 max-w-xs">
              Making childhood magical with premium toys and creative learning kits.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>All Toys</li>
              <li className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>New Arrivals</li>
              <li className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>Best Sellers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Help</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/shipping" className="hover:text-indigo-600 transition-colors">Shipping Info</Link></li>
               <li><Link to="/returns" className="hover:text-indigo-600 transition-colors">Returns</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-50 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          © 2024 ToyStore. Built with Magic.
        </div>
      </footer>
    </div>
  );
};

export default Layout;