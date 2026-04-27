export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-10">
      <div className="rounded-[48px] p-16 bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl">

        <h1 className="text-5xl font-black leading-tight">
          Premium Toys For Creative Kids
        </h1>

        <p className="mt-5 text-indigo-100 max-w-xl">
          STEM kits, robotics & learning adventures.
        </p>

        <div className="flex gap-4 mt-10">
          <button className="bg-white text-black px-7 py-3 rounded-xl font-semibold">
            Shop Now
          </button>

          <button className="border border-white px-7 py-3 rounded-xl">
            Explore
          </button>
        </div>

      </div>
    </section>
  );
}