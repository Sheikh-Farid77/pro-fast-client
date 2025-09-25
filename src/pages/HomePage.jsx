import Banner from "../components/banner/Banner";
import Benefits from "../components/benefit/Benefit";
import BrandSection from "../components/brands/BrandSection";
import Services from "../components/service/Service";

export default function HomePage(){
    return (
        <>
        <Banner />
        <Services />
        <BrandSection />
        <Benefits />
        </>
    );
}