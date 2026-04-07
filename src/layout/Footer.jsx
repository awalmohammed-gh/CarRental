import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Car,
  Shield,
  Award,
  Headphones,
  Send,
  ChevronRight
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Cars', path: '/cars' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Blog', path: '/blog' },
  ];

  const services = [
    { name: 'Car Rental', path: '/cars' },
    { name: 'Car Sales', path: '/sell' },
    { name: 'Insurance', path: '/insurance' },
    { name: 'Maintenance', path: '/maintenance' },
    { name: '24/7 Support', path: '/support' },
  ];

  const legal = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookies' },
    { name: 'Refund Policy', path: '/refund' },
  ];

//   const socialLinks = [
//     { icon: Facebook, href: 'https://facebook.com', color: 'hover:text-[#1877f2]' },
//     { icon: Twitter, href: 'https://twitter.com', color: 'hover:text-[#1da1f2]' },
//     { icon: Instagram, href: 'https://instagram.com', color: 'hover:text-[#e4405f]' },
//     { icon: Linkedin, href: 'https://linkedin.com', color: 'hover:text-[#0077b5]' },
//   ];

  return (
    <footer className="bg-[#1E293B] text-white mt-24">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold">
                <span className="text-[#2563EB]">Drive</span>
                <span className="text-white">Ease</span>
              </h2>
            </Link>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              Your trusted partner for premium car rentals and sales. Experience luxury driving at affordable prices.
            </p>
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-gray-300 text-sm">Spintex, Accra, East Airport</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <Phone className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-gray-300 text-sm">+233 241 52990</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-gray-300 text-sm">info@driveease.com</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#F59E0B] rounded-full"></span>
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-[#F59E0B] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Our Services
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#F59E0B] rounded-full"></span>
            </h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.path}
                    className="text-gray-300 hover:text-[#F59E0B] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Stay Connected
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#F59E0B] rounded-full"></span>
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to get special offers and updates
            </p>
            <div className="flex mb-6">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-[#0F172A] text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#F59E0B]"
              />
              <button className="px-4 py-2 bg-[#F59E0B] rounded-r-lg hover:bg-[#D97706] transition-colors duration-300">
                <Send className="w-5 h-5" />
              </button>
            </div>
           
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 py-8 mb-8 border-t border-b border-gray-700"
        >
          <div className="flex items-center gap-3">
            <Car className="w-6 h-6 text-[#F59E0B]" />
            <div>
              <p className="font-semibold text-sm">500+ Vehicles</p>
              <p className="text-gray-400 text-xs">In Our Fleet</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-[#F59E0B]" />
            <div>
              <p className="font-semibold text-sm">100% Secure</p>
              <p className="text-gray-400 text-xs">Booking Process</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-[#F59E0B]" />
            <div>
              <p className="font-semibold text-sm">Award Winner</p>
              <p className="text-gray-400 text-xs">Best Service 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Headphones className="w-6 h-6 text-[#F59E0B]" />
            <div>
              <p className="font-semibold text-sm">24/7 Support</p>
              <p className="text-gray-400 text-xs">Always Available</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8"
        >
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {legal.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-gray-400 hover:text-[#F59E0B] transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} DriveEase. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;