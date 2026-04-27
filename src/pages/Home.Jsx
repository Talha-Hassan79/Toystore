import Hero from "../sections/Hero";
import Stats from "../sections/Stats";
import Categories from "../sections/Categories";
// import AgeSection from "../sections/AgeSection";
import Products from "../sections/Products";
import Trust from "../sections/Trust";
import Footer from "../sections/Footer"
export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">

      <Hero />
      <Stats />
      <Categories />
      {/* <AgeSection /> */}
      <Products />
      <Trust />
      <Footer />
    </div>
  );
}