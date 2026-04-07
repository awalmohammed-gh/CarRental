import React from 'react';
import { motion } from 'framer-motion';
import useFetch from '../../hooks/useFetch';
import CarsCard from '../Card/CarsCard';
import { Car, Loader } from 'lucide-react';

const Featured = () => {
  const { data: cars, error, loading } = useFetch("/Cars");

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">!</div>
          <h3 className="text-[#0F172A] text-xl font-semibold mb-2">Server Error</h3>
          <p className="text-[#0F172A]/70">Unable to load vehicles. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <Loader className="w-12 h-12 text-[#2563EB] animate-spin mx-auto mb-4" />
          <p className="text-[#0F172A]/70">Loading featured vehicles...</p>
        </div>
      </div>
    );
  }

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 px-4 py-2 rounded-full mb-4">
            <Car className="w-4 h-4 text-[#2563EB]" />
            <span className="text-[#2563EB] text-sm font-semibold uppercase tracking-wide">
              Our Collection
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#2563EB]">Featured</span>
            <span className="text-[#1E293B]"> Vehicles</span>
          </h2>
          <p className="text-[#0F172A]/70 text-lg max-w-2xl mx-auto">
            Discover our most popular and highly-rated vehicles for your next journey
          </p>
        </motion.div>

        {/* Cars Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {cars.slice(0, 8).map((car, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <CarsCard deCars={car} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        {cars.length > 8 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <button 
              onClick={() => window.location.href = '/cars'}
              className="px-8 py-3 bg-transparent border-2 border-[#2563EB] text-[#2563EB] font-semibold rounded-lg hover:bg-[#2563EB] hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              View All Vehicles
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Featured;