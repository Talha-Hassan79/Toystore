import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, X, ShoppingCart } from "lucide-react";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const { cart } = useCart();

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100 shadow-sm"
    >
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto gap-8">
        <Link to="/" className="text-2xl font-bold text-indigo-600 shrink-0">
          🧸 ToyStore
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search toys..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100/50 border border-transparent rounded-full py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white focus:border-indigo-100 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-6 font-medium">
          <Link to="/" className="hover:text-indigo-600 transition-colors hidden sm:block">Home</Link>
          
          <Link to="/cart" className="relative group p-2 hover:bg-gray-100 rounded-full transition-all">
            <ShoppingCart size={22} className="text-gray-700" />
            {cart?.length > 0 && (
              <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cart.length}
              </span>
            )}
          </Link>

          <Link to="/login" className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200">
            Login
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;