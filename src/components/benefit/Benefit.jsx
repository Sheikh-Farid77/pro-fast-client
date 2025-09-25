import Benefit1 from "../../assets/live-tracking.png";
import Benefit2 from "../../assets/safe-delivery.png";
import Benefit3 from "../../assets/live-tracking.png";

const benefits = [
  {
    title: "Reliable Delivery",
    description: "We ensure on-time parcel delivery with full tracking support so you and your customers stay updated.",
    image: Benefit1,
  },
  {
    title: "Nationwide Coverage",
    description: "From major cities to remote areas, our logistics network ensures your parcels reach everywhere in Bangladesh.",
    image: Benefit2,
  },
  {
    title: "Business-Friendly",
    description: "Our tailored logistics solutions empower businesses with faster delivery, COD, and easy returns.",
    image: Benefit3,
  },
];

export default function Benefits() {
  return (
    <section className="bg-slate-100 py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-8">

        {benefits.map((item, index) => (
          <div
            key={index}
            className="flex items-center bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300"
          >
            {/* Left: Image */}
            <div className="w-28 sm:w-36 md:w-40 flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain p-4"
              />
            </div>

            {/* Divider */}
            <div className="w-px h-24 bg-gray-300"></div>

            {/* Right: Title + Description */}
            <div className="flex-1 p-4 md:p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
