import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productsData from "../data/products";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const found = productsData.find((p) => p._id === id);
    setProduct(found || null);
  }, [id]);

  if (!product) {
    return (
      <div className="p-10 text-center text-gray-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">

      {/* IMAGE SECTION */}
      <motion.div className="space-y-4">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={product.image}
          className="w-full h-[400px] object-cover rounded-xl shadow"
        />

        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <img
              key={i}
              src={product.image}
              className="w-20 h-20 object-cover rounded-lg border hover:scale-105 transition"
            />
          ))}
        </div>
      </motion.div>

      {/* INFO BOX (STICKY BUY BOX STYLE) */}
      <div className="space-y-4 md:sticky md:top-20 h-fit">

        <h1 className="text-3xl font-bold">{product.name}</h1>

        <p className="text-gray-500">
          Premium quality toy with amazing build and safe materials.
        </p>

        <p className="text-2xl font-bold text-yellow-600">
          ${product.price}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-black text-white py-3 rounded-xl hover:scale-105 transition"
        >
          Add to Cart
        </button>

        <button className="w-full bg-yellow-400 py-3 rounded-xl">
          Buy Now
        </button>

        {/* REVIEWS */}
        <div className="pt-4">
          <h2 className="font-bold mb-2">Reviews</h2>

          <div className="space-y-2 text-sm text-gray-600">
            <p>⭐️⭐️⭐️⭐️⭐️ Amazing toy! my kid loves it</p>
            <p>⭐️⭐️⭐️⭐️ Very good quality</p>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS (simple version) */}
      <div className="md:col-span-2 mt-10">
        <h2 className="text-xl font-bold mb-4">Related Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {productsData
            .filter((p) => p._id !== product._id)
            .slice(0, 4)
            .map((p) => (
              <div key={p._id} className="border rounded-lg p-2">
                <img src={p.image} className="h-32 w-full object-cover rounded" />
                <p className="font-semibold mt-2">{p.name}</p>
                <p className="text-yellow-600">${p.price}</p>
              </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default Product;