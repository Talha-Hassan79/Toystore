import { motion } from "framer-motion";
import { useSearch } from "../context/SearchContext";

const categories = [
  { label: "All Magic", value: "All", emoji: "✨", color: "from-indigo-400 to-indigo-600" },
  { label: "Soft Toys", value: "Soft Toys", emoji: "🧸", color: "from-pink-400 to-pink-600" },
  { label: "Educational", value: "Educational", emoji: "🧠", color: "from-emerald-400 to-emerald-600" },
  { label: "Electronics", value: "Electronics", emoji: "💎", color: "from-amber-400 to-amber-600" }
];

export default function Categories() {
  const { selectedCategory, setSelectedCategory } = useSearch();

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">
          Explore Your <span className="text-gradient">Adventure</span>
        </h2>
        <p className="text-slate-500 max-w-lg">
          Whether it's a cuddly friend or a brain-teasing puzzle, find the perfect gift for every curious mind.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
        {categories.map((cat) => (
          <motion.button
            key={cat.value}
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedCategory(cat.value);
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`
              relative group rounded-[3rem] p-10 transition-all duration-500 overflow-hidden
              ${selectedCategory === cat.value 
                ? 'bg-slate-900 text-white shadow-2xl shadow-indigo-200' 
                : 'bg-white text-slate-800 shadow-xl shadow-slate-100 hover:shadow-indigo-100'}
            `}
          >
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.color} opacity-10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700`} />
            
            <div className={`
              w-24 h-24 rounded-[2rem] flex items-center justify-center text-5xl mb-8 mx-auto shadow-inner bg-slate-50 transition-transform group-hover:scale-110 group-hover:rotate-6
            `}>
              {cat.emoji}
            </div>
            <div className="font-black text-xl tracking-tight">{cat.label}</div>
            <p className={`text-xs mt-2 font-bold uppercase tracking-widest ${selectedCategory === cat.value ? 'text-slate-400' : 'text-indigo-400'}`}>
              Browse Items
            </p>
            
            {selectedCategory === cat.value && (
              <motion.div 
                layoutId="activeCategoryDot"
                className="absolute top-6 left-6 w-3 h-3 bg-pink-500 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.8)]"
              />
            )}
          </motion.button>
        ))}
      </div>
    </section>
  );
}