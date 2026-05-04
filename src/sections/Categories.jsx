import { motion } from "framer-motion";
import { useSearch } from "../context/SearchContext";

const categories = [
  { label: "All", value: "All", emoji: "✨", color: "bg-indigo-50 text-indigo-600" },
  { label: "Soft Toys", value: "Soft Toys", emoji: "🧸", color: "bg-pink-50 text-pink-600" },
  { label: "Educational", value: "Educational", emoji: "🧠", color: "bg-emerald-50 text-emerald-600" },
  { label: "Electronics", value: "Electronics", emoji: "💎", color: "bg-amber-50 text-amber-600" }
];

export default function Categories() {
  const { selectedCategory, setSelectedCategory } = useSearch();

  return (
    <section className="max-w-7xl mx-auto px-6 mt-24">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-black text-gray-900">
            Shop by Adventure
          </h2>
          <p className="text-gray-500 mt-2">Pick a world to start your journey.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <motion.button
            key={cat.value}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedCategory(cat.value)}
            className={`
              relative group rounded-[40px] p-8 transition-all duration-300 border-2
              ${selectedCategory === cat.value 
                ? 'bg-white border-indigo-600 shadow-2xl shadow-indigo-100' 
                : 'bg-white border-transparent shadow-sm hover:shadow-xl hover:border-gray-100'}
            `}
          >
            <div className={`
              w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-6 mx-auto transition-transform group-hover:scale-110
              ${cat.color}
            `}>
              {cat.emoji}
            </div>
            <div className="font-black text-lg text-gray-800">{cat.label}</div>
            
            {selectedCategory === cat.value && (
              <motion.div 
                layoutId="activeCategory"
                className="absolute -bottom-2 -right-2 bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
              >
                ✓
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </section>
  );
}