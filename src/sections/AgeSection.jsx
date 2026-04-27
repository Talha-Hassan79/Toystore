const ages = [
  { age: "0-2", emoji: "🍼", color: "from-pink-400 to-rose-400" },
  { age: "3-5", emoji: "🧩", color: "from-orange-400 to-yellow-400" },
  { age: "6-9", emoji: "🚀", color: "from-indigo-500 to-purple-500" },
  { age: "10+", emoji: "🤖", color: "from-emerald-400 to-teal-500" }
];

export default function AgeSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-24">

      <h2 className="text-4xl font-black mb-10">
        Shop By Age
      </h2>

      <div className="grid md:grid-cols-4 gap-8">

        {ages.map((a) => (
          <div
            key={a.age}
            className={`bg-gradient-to-r ${a.color} rounded-[48px] p-10 shadow-xl`}
          >
            <div className="text-6xl">{a.emoji}</div>
            <div className="mt-5 text-3xl font-black">{a.age}</div>
          </div>
        ))}

      </div>

    </section>
  );
}