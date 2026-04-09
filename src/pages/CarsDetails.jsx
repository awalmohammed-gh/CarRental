import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import { 
  LocationEdit, 
  PhoneCall, 
  User, 
  Car, 
  Calendar, 
  Gauge, 
  Fuel, 
  Users,
  Star,
  Mail,
  MessageCircle,
  CheckCircle,
  ArrowLeft,
  MapPin,
  Award,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CarsDetails = () => {
  const { id } = useParams();
  const { data: Cars, error, loading } = useFetch("/Cars");
  const [carsData, setCarsData] = useState(null);
  const [thumbnails, setThumbnails] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchCarsData = () => {
      if (Cars && Cars.length > 0) {
        const findCarDetails = Cars.find((car) => car.id === id);
        if (findCarDetails) {
          setCarsData(findCarDetails);
          setThumbnails(findCarDetails?.images?.[0]);
          setActiveImageIndex(0);
        }
      }
    }
    fetchCarsData();
  }, [id, Cars]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#9810fa] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Car className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-gray-600">Error loading car details. Please try again later.</p>
          <Link to="/cars" className="mt-4 inline-block text-[#9810fa] hover:underline">Back to Cars</Link>
        </div>
      </div>
    );
  }

  if (!carsData) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">Car not found</p>
          <Link to="/cars" className="mt-4 inline-block text-[#9810fa] hover:underline">Back to Cars</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className='relative bg-[url("/images/carDetailBg.jpg")] flex items-center justify-center w-full h-[40vh] md:h-[55vh] bg-cover bg-center bg-no-repeat'>
        <div className='absolute inset-0 bg-gradient-to-b from-black/70 to-black/60'></div>
        <div className='relative z-10 text-center text-white px-4 max-w-3xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Car className="w-8 h-8 text-[#9810fa]" />
              <span className="text-sm font-semibold uppercase tracking-wider">Premium Cars</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              {carsData.name}
            </h1>
            <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto">
              {carsData.brand} {carsData.model} • {carsData.year} • {carsData.category}
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${carsData.availability ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm">{carsData.availability ? 'Available Now' : 'Currently Unavailable'}</span>
              </div>
              <div className="text-[#9810fa] font-bold text-xl">
                ₵{carsData.price.toLocaleString()}
                {carsData.status === "Rent" && <span className="text-sm font-normal text-gray-300">/day</span>}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl py-8 md:py-12">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap"
        >
          <Link to="/" className="hover:text-[#9810fa] transition-colors flex items-center gap-1">
            <Car className="w-4 h-4" />
            Home
          </Link>
          <span>/</span>
          <Link to="/cars" className="hover:text-[#9810fa] transition-colors">Cars</Link>
          <span>/</span>
          <span className="text-[#9810fa] font-semibold">{carsData.name}</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Image Gallery Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2"
          >
            <div className="sticky top-24">
              {/* Main Image */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg mb-4">
                <img
                  src={thumbnails}
                  alt={carsData.name}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                
                {/* Status Badge */}
                <div className={`absolute top-4 left-4 px-4 py-2 rounded-lg text-white font-semibold text-sm ${
                  carsData.status === "Sell" ? "bg-green-500" : "bg-blue-500"
                }`}>
                  {carsData.status === "Sell" ? "For Sale" : "For Rent"}
                </div>
              </div>

              {/* Thumbnails */}
              {carsData.images && carsData.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {carsData.images.map((image, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => {
                        setThumbnails(image);
                        setActiveImageIndex(index);
                      }}
                      className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                        activeImageIndex === index ? "border-[#9810fa] shadow-lg" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Car Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2"
          >
            {/* Key Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 p-4 bg-white rounded-xl shadow-sm">
              <div className="text-center">
                <Calendar className="w-5 h-5 text-[#9810fa] mx-auto mb-1" />
                <p className="text-xs text-gray-500">Year</p>
                <p className="font-semibold text-gray-800">{carsData.year}</p>
              </div>
              <div className="text-center">
                <Gauge className="w-5 h-5 text-[#9810fa] mx-auto mb-1" />
                <p className="text-xs text-gray-500">Transmission</p>
                <p className="font-semibold text-gray-800">{carsData.transmission}</p>
              </div>
              <div className="text-center">
                <Fuel className="w-5 h-5 text-[#9810fa] mx-auto mb-1" />
                <p className="text-xs text-gray-500">Fuel Type</p>
                <p className="font-semibold text-gray-800">{carsData.fuelType}</p>
              </div>
              <div className="text-center">
                <Users className="w-5 h-5 text-[#9810fa] mx-auto mb-1" />
                <p className="text-xs text-gray-500">Seats</p>
                <p className="font-semibold text-gray-800">{carsData.seats}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Car className="w-5 h-5 text-[#9810fa]" />
                About This Car
              </h3>
              <p className="text-gray-600 leading-relaxed">{carsData.description}</p>
            </div>

            {/* Features */}
            {carsData.features && carsData.features.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#9810fa]" />
                  Key Features
                </h3>
                <div className="flex flex-wrap gap-2">
                  {carsData.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3 text-[#9810fa]" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div className="mb-6 p-4 bg-white rounded-xl shadow-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#9810fa]" />
                <span className="text-gray-700">Location: <span className="font-semibold">{carsData.location}</span></span>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex gap-4">
              <button className="flex-1 py-3.5 bg-[#9810fa] text-white rounded-xl font-semibold hover:bg-[#7a0cc8] transition-all shadow-lg hover:shadow-xl">
                {carsData.status === "Sell" ? "Buy Now" : "Rent Now"}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Dealer Information Section */}
        {carsData.dealer && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-[#9810fa]" />
              Dealer Information
            </h2>
            
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  
                  {/* Dealer Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#9810fa] to-[#7a0cc8] rounded-full flex items-center justify-center">
                      {carsData.dealer.image ? (
                        <img src={carsData.dealer.image} alt={carsData.dealer.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User className="w-12 h-12 text-white" />
                      )}
                    </div>
                  </div>

                  {/* Dealer Details */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{carsData.dealer.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold">{carsData.dealer.rating}</span>
                      <span className="text-xs text-gray-500">• {carsData.dealer.yearsInBusiness} years in business</span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-[#9810fa]" />
                        <span className="text-sm">{carsData.dealer.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <PhoneCall className="w-4 h-4 text-[#9810fa]" />
                        <span className="text-sm">{carsData.dealer.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4 text-[#9810fa]" />
                        <span className="text-sm">{carsData.dealer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Shield className="w-4 h-4 text-[#9810fa]" />
                        <span className="text-sm">Verified Dealer</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-[#9810fa] text-white rounded-lg hover:bg-[#7a0cc8] transition-all">
                        <Mail className="w-4 h-4" />
                        Message Dealer
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all">
                        <MessageCircle className="w-4 h-4" />
                        Chat Via WhatsApp
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 border border-[#9810fa] text-[#9810fa] rounded-lg hover:bg-[#9810fa] hover:text-white transition-all">
                        <PhoneCall className="w-4 h-4" />
                        Call Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link to="/cars">
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#9810fa] transition-colors mx-auto">
              <ArrowLeft className="w-4 h-4" />
              Back to All Cars
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarsDetails;