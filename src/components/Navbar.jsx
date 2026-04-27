import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20 shadow-sm"
    >
      <div className="flex justify-between items-center p-4 max-w-6xl mx-auto">
        <Link className="text-2xl font-bold text-yellow-600">
          🧸 ToyStore
        </Link>

        <div className="flex gap-6 font-medium">
          {["Home", "Cart", "Login"].map((item, i) => (
            <Link
              key={i}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="relative group"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;