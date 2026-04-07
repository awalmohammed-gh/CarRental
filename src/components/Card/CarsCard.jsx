import { Link } from 'react-router-dom';
import { Fuel, Users, Settings, Calendar, Heart } from 'lucide-react';
import { useState } from 'react';

const CarsCard = ({ deCars }) => {
  const { id, brand, name, price, status, transmission, fuelType, seats, images } = deCars;
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Link to={`/cars-details/${id}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative overflow-hidden h-48 md:h-56">
          <img 
            src={images[0]} 
            alt={`${brand} ${name}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Status Badge */}
          {status && (
            <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${
              status === 'Available' 
                ? 'bg-green-500 text-white' 
                : status === 'Rented' 
                ? 'bg-red-500 text-white'
                : 'bg-[#F59E0B] text-white'
            }`}>
              {status}
            </span>
          )}
          
          {/* Wishlist Button */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200"
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-[#1E293B]'
              }`}
            />
          </button>
          
          {/* Price Tag */}
          <div className="absolute bottom-3 right-3 bg-[#2563EB] text-white px-3 py-1 rounded-lg font-bold text-lg">
            ${price}<span className="text-xs font-normal">{status === "Rent" && "/day"}</span>
          </div>
        </div>
        
        {/* Content Container */}
        <div className="p-4">
          {/* Brand & Name */}
          <div className="mb-3">
            <h3 className="text-[#1E293B] text-sm font-semibold capitalize tracking-wide">
              {brand}
            </h3>
            <h2 className="text-[#0F172A] text-lg font-bold mt-1 group-hover:text-[#2563EB] transition-colors">
              {name}
            </h2>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-2 mb-4 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1 text-xs text-[#0F172A]/70">
              <Settings className="w-3 h-3" />
              <span>{transmission}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#0F172A]/70">
              <Fuel className="w-3 h-3" />
              <span>{fuelType}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#0F172A]/70">
              <Users className="w-3 h-3" />
              <span>{seats} Seats</span>
            </div>
          </div>
          
          {/* Rent Now Button */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              // Handle rent now action
            }}
            className="w-full py-2 bg-[#F59E0B] text-white font-semibold rounded-lg hover:bg-[#D97706] transition-all duration-300 transform hover:scale-[1.02]"
          >
            {status === "Sell" ? "Buy Now":"Rent Now"}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CarsCard;