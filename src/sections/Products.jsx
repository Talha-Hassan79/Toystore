import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { getProducts } from "../services/api";
import { useSearch } from "../context/SearchContext";
import { motion, AnimatePresence } from "framer-motion";
import { SearchX } from "lucide-react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, setSearchQuery, selectedCategory } = useSearch();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getProducts();
      setProducts(data || []);
      setLoading(false);
    })();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <section className="max-w-7xl mx-auto px-6 mt-10 min-h-[400px]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900">
            {selectedCategory === 'All' ? 'Featured Toys' : `${selectedCategory} Toys`}
          </h2>
          <p className="text-gray-500 mt-2">
            {searchQuery 
              ? `Search results for "${searchQuery}"` 
              : `Browse our hand-picked collection of ${selectedCategory.toLowerCase()} magic.`}
          </p>
        </div>
        {searchQuery && (
          <p className="text-sm text-indigo-600 font-bold bg-indigo-50 px-4 py-2 rounded-full">
            Found {filteredProducts.length} results
          </p>
        )}
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              <motion.div 
                layout
                className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              >
                {filteredProducts.map((p) => (
                  <ProductCard key={p._id || p.id} product={p} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[40px] border-2 border-dashed border-gray-100"
              >
                <div className="bg-gray-50 p-8 rounded-full mb-6">
                  <SearchX size={56} className="text-gray-300" />
                </div>
                <h3 className="text-2xl font-black text-gray-800">No toys found</h3>
                <p className="text-gray-500 mt-3 max-w-xs mx-auto">
                  We couldn't find any products matching your current filters.
                </p>
                <button 
                  onClick={() => { setSearchQuery(''); /* Reset could also reset category if needed */ }}
                  className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-slate-100"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}