import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 max-w-6xl mx-auto"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Layout;