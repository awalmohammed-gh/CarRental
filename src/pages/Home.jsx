import AdvertOne from "../components/Landing/AdvertOne";
import AdvertTwo from "../components/Landing/AdvertTwo";
import CarTypes from "../components/Landing/CarTypes";
import Featured from "../components/Landing/Featured";
import Hero from "../components/Landing/Hero";
import Newsletter from "../components/Landing/Newsletter";
import Recommend from "../components/Landing/Recommend";

const Home = () => {
  return (
    <div>
      <Hero />
      <CarTypes/>
      <Featured/>
      <AdvertOne/>
      <Recommend/>
      <AdvertTwo/>
      {/* <Newsletter/> */}
    </div>
  );
};

export default Home;
