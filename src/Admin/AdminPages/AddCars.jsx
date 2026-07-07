import React, { useEffect, useState } from "react";
import {
  Car,
  Upload,
  X,
  Plus,
  Save,
  Trash2,
  Image as ImageIcon,
  Info,
} from "lucide-react";

const AddCars = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    status: "available",
    category: "",
    transmission: "",
    fuelType: "",
    seats: "",
    location: "",
    availability: false,
    description: "",
    features: [],
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [featureInput, setFeatureInput] = useState("");

  const handleChanges = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files ?? []);
    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Images:", images);
    // Add your API call here
  };

  useEffect(() => {
    const urls = images.map((img) => URL.createObjectURL(img));
    setPreview(urls);

    return () => {
      urls.forEach((url) => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [images]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Add New Car</h2>
          <p className="text-gray-500 text-sm">List a new vehicle for rental</p>
        </div>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-[#9810fa] text-white rounded-lg hover:bg-[#7a0cc9] transition-colors flex items-center gap-2 shadow-sm"
        >
          <Save size={18} />
          Save Car
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Car size={18} className="text-[#9810fa]" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Car Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChanges}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9810fa]/20 focus:border-[#9810fa] transition-all"
                    placeholder="e.g., Mercedes-AMG GLE 53"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChanges}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9810fa]/20 focus:border-[#9810fa] transition-all"
                    placeholder="e.g., Mercedes"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model *
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChanges}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9810fa]/20 focus:border-[#9810fa] transition-all"
                    placeholder="e.g., GLE 53"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year *
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChanges}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9810fa]/20 focus:border-[#9810fa] transition-all"
                    placeholder="e.g., 2023"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChanges}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9810fa]/20 focus:border-[#9810fa] transition-all"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Truck">Truck</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transmission
                  </label>
                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChanges}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9810fa]/20 focus:border-[#9810fa] transition-all"
                  >
                    <option value="">Select</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                    <option value="CVT">CVT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fuel Type
                  </label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChanges}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9810fa]/20 focus:border-[#9810fa] transition-all"
                  >
                    <option value="">Select</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Seats
                  </label>
                  <input
                    type="number"
                    name="seats"
                    value={formData.seats}
                    onChange={handleChanges}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9810fa]/20 focus:border-[#9810fa] transition-all"
                    placeholder="e.g., 5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Per Day (₵) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChanges}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9810fa]/20 focus:border-[#9810fa] transition-all"
                    placeholder="e.g., 450"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChanges}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9810fa]/20 focus:border-[#9810fa] transition-all"
                    placeholder="e.g., East Legon"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Features</h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="Add a feature (e.g., Air Conditioning)"
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9810fa]/20 focus:border-[#9810fa] transition-all"
                  onKeyPress={(e) => e.key === "Enter" && handleAddFeature()}
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-4 py-2 bg-[#9810fa] text-white rounded-lg hover:bg-[#7a0cc9] transition-colors flex items-center gap-1"
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#9810fa]/10 text-[#9810fa] rounded-full text-sm"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="hover:text-red-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
                {formData.features.length === 0 && (
                  <span className="text-sm text-gray-400">
                    No features added yet
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Status & Availability */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Status</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChanges}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9810fa]/20 focus:border-[#9810fa] transition-all"
                  >
                    <option value="available">Available</option>
                    <option value="rented">Rented</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="availability"
                    checked={formData.availability}
                    onChange={handleChanges}
                    className="w-4 h-4 text-[#9810fa] border-gray-300 rounded focus:ring-[#9810fa]/20"
                  />
                  <label className="text-sm text-gray-700">
                    Available for rental
                  </label>
                </div>
              </div>
            </div>

            {/* Images Upload */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ImageIcon size={18} className="text-[#9810fa]" />
                Images
              </h3>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-[#9810fa] transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImages}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Click to upload images
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, WEBP up to 5MB
                  </p>
                </label>
              </div>

              {/* Image Previews */}
              {preview.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {preview.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {preview.length > 0 && (
                <p className="text-xs text-gray-400 mt-2">
                  {preview.length} images uploaded
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Info size={18} className="text-[#9810fa]" />
            Description
          </h3>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChanges}
            rows="4"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9810fa]/20 focus:border-[#9810fa] transition-all resize-none"
            placeholder="Write a detailed description of the car..."
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="reset"
            className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear All
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#9810fa] text-white rounded-lg hover:bg-[#7a0cc9] transition-colors flex items-center gap-2 shadow-sm"
          >
            <Save size={18} />
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCars;
