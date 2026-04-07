import { useState } from "react";
import useFetch from "../hooks/useFetch";
import CarsCard from "../components/Card/CarsCard";
import { Filter, X, ChevronDown, Car, DollarSign, Tag, Search } from "lucide-react";
import { motion } from "framer-motion";
import AdvertTwo from "../components/Landing/AdvertTwo";

const Cars = () => {
  const { data: Cars, error, loading } = useFetch("/Cars");
  const [category, setCategory] = useState(["All"]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const uniqueCategories = ["All", ...new Set(Cars?.map((car) => car.category.toLowerCase().replace(/\s+/g, "-")) || [])];
  
const priceRanges = [
  "100 - 1000",
  "1000 - 5000",
  "5000 - 10000",
  "10000 - 20000",
  "20000 - 50000",
  "50000 - 100000",
  "100000 - 150000",
  "150000 - 200000"
];

  const filteredCars = Cars?.filter((car) => {
    const slug = car.category.toLowerCase().replace(/\s+/g, "-");
    const catMatches = category.includes("All") || category.includes(slug);
    const matchesPrice = car.price <= maxPrice && car.price >= minPrice;
    return catMatches && matchesPrice;
  }) || [];

  const handleCategory = (cat) => {
    if (category.includes("All")) {
      setCategory([cat]);
    } else {
      setCategory((prev) => 
        prev.includes(cat) 
          ? prev.filter((item) => item !== cat) 
          : [...prev, cat]
      );
    }
  };

  const clearFilters = () => {
    setCategory(["All"]);
    setMinPrice(0);
    setMaxPrice(Infinity);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (!category.includes("All")) count += category.length;
    if (minPrice !== 0 || maxPrice !== Infinity) count += 1;
    return count;
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#9810fa] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cars...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Car className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-gray-600">Error loading cars. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Hero Section */}
     <div className="relative">
       <div className="bg-fixed bg-[url('/images/carBg.jpg')] bg-no-repeat bg-cover bg-center h-[40vh] md:h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/60"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Car className="w-8 h-8 text-[#9810fa]" />
              <span className="text-sm font-semibold uppercase tracking-wider">Car Rental & Sales</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              Choose the Right Car for You
            </h1>
            <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto">
              From affordable rides to premium vehicles, explore cars available for both rental and ownership.
            </p>
          </motion.div>
        </div>
      </div>
     </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl py-8 md:py-12">
        
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#9810fa]" />
              <span className="font-semibold text-gray-700">Filters</span>
              {getActiveFilterCount() > 0 && (
                <span className="bg-[#9810fa] text-white text-xs rounded-full px-2 py-1">
                  {getActiveFilterCount()}
                </span>
              )}
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block md:w-80 flex-shrink-0`}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-sm p-6 sticky top-24"
            >
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-[#9810fa]" />
                  <h3 className="font-bold text-lg text-gray-800">Filters</h3>
                </div>
                {getActiveFilterCount() > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-sm text-[#9810fa] hover:text-[#7a0cc8] transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Clear all</span>
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-[#9810fa]" />
                  <h4 className="font-semibold text-gray-800">Car Category</h4>
                </div>
                <div className="space-y-3">
                  {uniqueCategories.map((cat, index) => (
                    <label key={index} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={category.includes(cat)}
                        onChange={() => handleCategory(cat)}
                        className="w-4 h-4 rounded border-gray-300 text-[#9810fa] focus:ring-[#9810fa] cursor-pointer"
                      />
                      <span className="capitalize text-gray-700 group-hover:text-[#9810fa] transition-colors">
                        {cat.replace(/-/g, ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-[#9810fa]" />
                  <h4 className="font-semibold text-gray-800">Price Range (GHS)</h4>
                </div>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="price"
                      checked={minPrice === 0 && maxPrice === Infinity}
                      onChange={() => {
                        setMinPrice(0);
                        setMaxPrice(Infinity);
                      }}
                      className="w-4 h-4 text-[#9810fa] focus:ring-[#9810fa] cursor-pointer"
                    />
                    <span className="text-gray-700 group-hover:text-[#9810fa] transition-colors">All Prices</span>
                  </label>
                  {priceRanges.map((price, index) => (
                    <label key={index} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="price"
                        onChange={() => {
                          const [min, max] = price.split(' - ').map(Number);
                          setMinPrice(min);
                          setMaxPrice(max);
                        }}
                        className="w-4 h-4 text-[#9810fa] focus:ring-[#9810fa] cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-[#9810fa] transition-colors">
                        ₵{price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Active Filters Display */}
              {getActiveFilterCount() > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Active Filters:</p>
                  <div className="flex flex-wrap gap-2">
                    {!category.includes("All") && category.map(cat => (
                      <span key={cat} className="text-xs bg-[#9810fa]/10 text-[#9810fa] px-2 py-1 rounded-full">
                        {cat.replace(/-/g, ' ')}
                      </span>
                    ))}
                    {(minPrice !== 0 || maxPrice !== Infinity) && (
                      <span className="text-xs bg-[#9810fa]/10 text-[#9810fa] px-2 py-1 rounded-full">
                        ₵{minPrice.toLocaleString()} - ₵{maxPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Cars Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-[#9810fa]" />
                  <p className="text-gray-700">
                    Showing <span className="font-bold text-[#9810fa]">{filteredCars.length}</span> cars
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#9810fa]">
                    <option>Latest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Most Popular</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Cars Grid */}
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car, index) => (
                  <CarsCard key={index} deCars={car} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white rounded-2xl"
              >
                <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No cars found for the selected filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-[#9810fa] font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
        
      </div>
      <div className="mt-20">
          <AdvertTwo/>
        </div>
    </section>
  );
};

export default Cars;