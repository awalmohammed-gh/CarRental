import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Bell, CheckCircle, XCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(['idle' | 'loading' | 'success' | 'error'])
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setMessage('Successfully subscribed! Check your inbox.');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#2563EB] to-[#1E293B] my-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#F59E0B] rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10 py-12 md:py-16 px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F59E0B] rounded-full mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              
              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Subscribe to Our <span className="text-[#F59E0B]">Newsletter</span>
              </h2>
              
              {/* Description */}
              <p className="text-white/80 text-base sm:text-lg mb-8">
                Get the latest updates on new arrivals, exclusive offers, and driving tips delivered straight to your inbox.
              </p>
              
              {/* Benefits */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Bell className="w-4 h-4 text-[#F59E0B]" />
                  <span className="text-white text-sm">Weekly Updates</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="text-white text-sm">🔥 Exclusive Offers</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="text-white text-sm">🚗 Car Reviews</span>
                </div>
              </div>
              
              {/* Newsletter Form */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#0F172A]/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      disabled={status === 'loading'}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white text-[#0F172A] placeholder:text-[#0F172A]/40 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-6 py-3 bg-[#F59E0B] text-white font-semibold rounded-lg hover:bg-[#D97706] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
                
                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white text-sm">{message}</span>
                  </motion.div>
                )}
                
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5 text-red-400" />
                    <span className="text-white text-sm">{message}</span>
                  </motion.div>
                )}
              </form>
              
              {/* Trust Badge */}
              <p className="text-white/50 text-xs mt-6">
                By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;