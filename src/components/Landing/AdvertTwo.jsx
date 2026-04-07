import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Clock } from 'lucide-react';

const AdvertTwo = () => {
  return (
    <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-[url('/images/advertBg.jpg')] bg-no-repeat bg-cover bg-fixed"
        style={{
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E293B]/90 to-[#2563EB]/80" />
      
      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#F59E0B]/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
            <span className="text-[#F59E0B] text-sm font-semibold uppercase tracking-wide">
              Limited Time Offer
            </span>
          </div>
          
          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Get <span className="text-[#F59E0B]">20% OFF</span> Your First Ride
          </h2>
          
          {/* Description */}
          <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Experience luxury driving at unbeatable prices. Use code <span className="text-[#F59E0B] font-semibold">DRIVEEASE20</span> on your first booking
          </p>
          
          {/* Features Grid */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-white/80">
              <Shield className="w-5 h-5 text-[#F59E0B]" />
              <span className="text-sm">Insurance Included</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Clock className="w-5 h-5 text-[#F59E0B]" />
              <span className="text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Star className="w-5 h-5 text-[#F59E0B]" />
              <span className="text-sm">5 Star Service</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-3 bg-[#F59E0B] text-white font-semibold rounded-lg hover:bg-[#D97706] transition-all duration-300 flex items-center justify-center gap-2"
            >
              Claim Offer
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#2563EB] transition-all duration-300"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdvertTwo;