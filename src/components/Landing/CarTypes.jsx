import { motion } from "framer-motion";
import { Car, Gauge, Zap, Shield, Sparkles } from "lucide-react";

const CarTypes = () => {
  const carTypes = [
    "Sedan",
    "SUV",
    "Hatchback",
    "Coupe",
    "Convertible",
    "Pickup Truck",
    "Minivan",
    "Electric Car",
    "Hybrid",
    "Luxury",
    "Sports Car",
    "Station Wagon",
    "Crossover",
  ];

  // Icon mapping for different car types
  const getIcon = (carType) => {
    if (carType.includes("Electric")) return <Zap className="w-5 h-5" />;
    if (carType.includes("Sports")) return <Gauge className="w-5 h-5" />;
    if (carType.includes("Luxury")) return <Sparkles className="w-5 h-5" />;
    if (carType.includes("SUV") || carType.includes("Pickup")) return <Shield className="w-5 h-5" />;
    return <Car className="w-5 h-5" />;
  };

  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#2563EB]">A Vehicle</span>
            <span className="text-[#1E293B]"> For Every Lifestyle</span>
          </h2>
          <p className="text-[#0F172A]/70 text-lg max-w-2xl mx-auto">
            Choose from our wide range of vehicles tailored to your needs and preferences
          </p>
        </motion.div>

        {/* Car Types Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
              },
            },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {carTypes.map((car, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.4,
                    ease: "easeOut",
                  },
                },
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-xl p-4 md:p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300">
                  {getIcon(car)}
                </div>
                <h3 className="text-[#0F172A] font-semibold text-sm md:text-base">
                  {car}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 bg-[#2563EB] text-white font-semibold rounded-lg hover:bg-[#1d4ed8] transition-all duration-300 transform hover:scale-105">
            View All Vehicles
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CarTypes;