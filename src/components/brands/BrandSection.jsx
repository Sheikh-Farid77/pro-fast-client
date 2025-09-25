import Brand1 from "../../assets/brands/amazon.png";
import Brand2 from "../../assets/brands/amazon_vector.png";
import Brand3 from "../../assets/brands/casio.png";
import Brand4 from "../../assets/brands/moonstar.png";
import Brand5 from "../../assets/brands/randstad.png";
import Brand6 from "../../assets/brands/start.png";
import Brand7 from "../../assets/brands/start-people 1.png";
import Marquee from "react-fast-marquee";

const brands = [Brand1, Brand2, Brand3, Brand4, Brand5, Brand6, Brand7];

export default function BrandSection() {
  return (
    <section className="bg-slate-100 py-10">
        <div className="overflow-hidden">
            <h3 className="text-black text-center font-bold text-2xl">We've helped thousands of sales teams</h3>
          <Marquee
            direction="left"
            speed={20} // Adjust speed as needed
            delay={0}
            minWidth="100%"
            minHeight="100px"
          >
            {brands.concat(brands).map((brand, idx) => (
              <div key={idx} className="flex-shrink-0 mx-8">
                <img
                  src={brand}
                  alt={`Brand ${idx + 1}`}
                  className="w-24 sm:w-28 md:w-32 h-16 sm:h-20 md:h-24 object-contain"
                />
              </div>
            ))}
          </Marquee>
        </div>
    </section>
  );
}
