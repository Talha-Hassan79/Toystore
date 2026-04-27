const stats = [
  ["10K+", "Toys"],
  ["500+", "Brands"],
  ["24hr", "Shipping"],
  ["4.9★", "Reviews"]
];

export default function Stats() {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-24">
      <div className="grid md:grid-cols-4 gap-8">

        {stats.map(([n, t]) => (
          <div
            key={n}
            className="bg-white rounded-[40px] p-10 shadow-lg text-center border"
          >
            <div className="text-4xl font-black">{n}</div>
            <div className="text-gray-500 mt-3">{t}</div>
          </div>
        ))}

      </div>
    </section>
  );
}