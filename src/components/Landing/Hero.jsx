import { useEffect, useRef, useState } from "react";
import { heroData } from "../../data/data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const [countIndex, setCountIndex] = useState(0);
  const interRef = useRef();

  const goNext = () => {
    setCountIndex((prev) => (prev === heroData.length - 1 ? 0 : prev + 1));
  };

  const goPrev = () => {
    setCountIndex((prev) => (prev === 0 ? heroData.length - 1 : prev - 1));
  };

  useEffect(() => {
    interRef.current = setInterval(() => {
      goNext();
    }, 4000);

    return () => clearInterval(interRef.current);
  }, [countIndex]);

  const countHero = heroData[countIndex];

  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      {/* Background Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={countIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${countHero.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={countIndex + "-text"}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                {countHero.title}
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
                {countHero.description}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-[#2563EB] text-white font-semibold rounded-lg"
                >
                  Browse Cars
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-[#F59E0B] text-[#F59E0B] font-semibold rounded-lg hover:bg-[#F59E0B] hover:text-white"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={goPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
      </button>

      <button
        onClick={goNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:scale-110"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-2">
        {heroData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCountIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === countIndex
                ? "w-8 h-2 bg-[#F59E0B]"
                : "w-2 h-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
