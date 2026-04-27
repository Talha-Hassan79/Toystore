export default function Footer() {
  return (
    <footer className="mt-24 bg-slate-900 text-white">

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 py-16 px-6">

        <div>
          <h3 className="font-bold text-xl">ToyVerse</h3>
          <p className="text-slate-400 mt-3">
            Play with imagination.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Shop</h4>
          <p>STEM</p>
          <p>Puzzles</p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <p>Returns</p>
          <p>Shipping</p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <input className="w-full p-3 rounded-xl text-black" />
        </div>

      </div>

    </footer>
  );
}