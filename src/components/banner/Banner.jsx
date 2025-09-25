import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Banner1 from "../../assets/banner/banner1.png";
import Banner2 from "../../assets/banner/banner2.png";
import Banner3 from "../../assets/banner/banner3.png";

export default function Banner() {
  return (
    <div className="bg-slate-100">
      <div className="relative w-full max-w-7xl mx-auto py-6 px-2">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          interval={2000}
          showThumbs={false}
          showStatus={false}
          swipeable
          emulateTouch
          showArrows
          className="rounded-xl overflow-hidden shadow-lg"
        >
          {/* Slide 1 */}
          <div className="w-full aspect-[4/3] md:aspect-[16/6]">
            <img
              src={Banner1}
              alt="Banner 1"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* Slide 2 */}
          <div className="w-full aspect-[4/3] md:aspect-[16/6]">
            <img
              src={Banner2}
              alt="Banner 2"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* Slide 3 */}
          <div className="w-full aspect-[4/3] md:aspect-[16/6]">
            <img
              src={Banner3}
              alt="Banner 3"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
