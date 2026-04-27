import { motion } from "framer-motion";

const categories = [
  { label: "All", value: "all", emoji: "✨" },
  { label: "Budget", value: "cheap", emoji: "🧸" },
  { label: "Educational", value: "mid", emoji: "🧠" },
  { label: "Premium", value: "expensive", emoji: "💎" }
];

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-24">

      <h2 className="text-4xl font-black mb-10">
        Shop by Adventure
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

        {categories.map((cat) => (
          <motion.button
            key={cat.value}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-[44px] p-10 shadow-lg border"
          >
            <div className="text-6xl mb-4">{cat.emoji}</div>
            <div className="font-bold">{cat.label}</div>
          </motion.button>
        ))}

      </div>

    </section>
  );
}