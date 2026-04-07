import React from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdvertOne = () => {

    const navigate = useNavigate()
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#2563EB] to-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Left Card - Looking for a Car */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            className="relative group"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
              {/* Icon */}
              <div className="w-16 h-16 bg-[#F59E0B] rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Search className="w-8 h-8 text-white" />
              </div>
              
              {/* Content */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Are You Looking For a Car?
              </h2>
              <p className="text-white/80 text-base md:text-lg mb-6 leading-relaxed">
                Find your perfect ride from our extensive collection of premium vehicles. 
                Compare prices, features, and book instantly.
              </p>
              
              {/* Features List */}
              <ul className="space-y-2 mb-8">
                <li className="flex items-center gap-2 text-white/80 text-sm">
                  <div className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full"></div>
                  <span>500+ vehicles available</span>
                </li>
                <li className="flex items-center gap-2 text-white/80 text-sm">
                  <div className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full"></div>
                  <span>Best price guaranteed</span>
                </li>
                <li className="flex items-center gap-2 text-white/80 text-sm">
                  <div className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full"></div>
                  <span>Free cancellation</span>
                </li>
              </ul>
              
              {/* Button */}
              <button onClick={() => navigate("/cars")} className="group/btn w-full md:w-auto px-8 py-3 bg-[#F59E0B] text-white font-semibold rounded-lg hover:bg-[#D97706] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                Browse Cars
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Card - Sell a Car */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            className="relative group"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
              {/* Icon */}
              <div className="w-16 h-16 bg-[#F59E0B] rounded-full flex items-center justify-center mb-6 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              
              {/* Content */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Do You Want to Sell a Car?
              </h2>
              <p className="text-white/80 text-base md:text-lg mb-6 leading-relaxed">
                Get the best value for your vehicle. Quick evaluation, hassle-free process, 
                and instant payment.
              </p>
              
              {/* Features List */}
              <ul className="space-y-2 mb-8">
                <li className="flex items-center gap-2 text-white/80 text-sm">
                  <div className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full"></div>
                  <span>Free car valuation</span>
                </li>
                <li className="flex items-center gap-2 text-white/80 text-sm">
                  <div className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full"></div>
                  <span>Instant quote</span>
                </li>
                <li className="flex items-center gap-2 text-white/80 text-sm">
                  <div className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full"></div>
                  <span>Same day payment</span>
                </li>
              </ul>
              
              {/* Button */}
              <button onClick={() => navigate("/plans")} className="group/btn w-full md:w-auto px-8 py-3 bg-[#F59E0B] text-white font-semibold rounded-lg hover:bg-[#D97706] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                Sell Your Car
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-white/60 text-sm">
            Join thousands of satisfied customers who trust DriveEase
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AdvertOne;