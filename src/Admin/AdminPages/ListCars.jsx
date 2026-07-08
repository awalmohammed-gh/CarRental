import React, { useState, useEffect } from "react";
import {
  Car,
  Search,
  Filter,
  Trash2,
  Edit,
  Eye,
  AlertCircle,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Tag,
  MapPin,
  DollarSign,
  Calendar,
} from "lucide-react";
import apis from "../../../api/apis";

const ListCars = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [listCars, setListCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const fetchCars = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const { data } = await apis.get("/car/list-cars");
      if (data.success) {
        setListCars(data.cars || []);
      } else {
        setErrorMessage(data.message || "Failed to fetch cars");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred while fetching cars",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const removeCarsFromList = async (id) => {
    setLoading(true);
    try {
      const { data } = await apis.delete(`/car/remove-car/${id}`);
      if (data.success) {
        setSuccessMessage(data.message || "Car removed successfully");
        fetchCars();
        setShowDeleteModal(false);
        setSelectedCar(null);
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } else {
        setErrorMessage(data.message || "Failed to remove car");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred while removing the car",
      );
    } finally {
      setLoading(false);
    }
  };

  // Filter cars based on search and status
  const filteredCars = listCars.filter((car) => {
    const matchesSearch =
      car.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" || car.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCars = filteredCars.slice(startIndex, endIndex);

  // Status badge
  const StatusBadge = ({ status }) => {
    const config = {
      available: { color: "bg-green-100 text-green-700", dot: "bg-green-500" },
      rented: { color: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
      maintenance: {
        color: "bg-yellow-100 text-yellow-700",
        dot: "bg-yellow-500",
      },
      sell: { color: "bg-purple-100 text-purple-700", dot: "bg-purple-500" },
      unavailable: { color: "bg-red-100 text-red-700", dot: "bg-red-500" },
    };

    const { color, dot } = config[status] || config.available;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${color}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  // Delete Confirmation Modal
  const DeleteModal = () => {
    if (!showDeleteModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-slideDown">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-full">
              <Trash2 size={24} className="text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Delete Car</h3>
          </div>
          <p className="text-gray-600 text-sm mb-2">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-800">
              {selectedCar?.name}
            </span>
            ?
          </p>
          <p className="text-gray-500 text-xs mb-6">
            This action cannot be undone.
          </p>

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedCar(null);
              }}
              className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => removeCarsFromList(selectedCar?._id)}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Car size={24} className="text-[#9810fa]" />
            List Cars
          </h2>
          <p className="text-gray-500 text-sm">
            Manage all cars in your inventory
          </p>
        </div>
        <button
          onClick={fetchCars}
          disabled={loading}
          className="px-4 py-2 bg-[#9810fa] text-white rounded-lg hover:bg-[#7a0cc9] transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3 animate-slideDown">
          <CheckCircle
            size={20}
            className="text-green-600 shrink-0 mt-0.5"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-green-800">Success!</p>
            <p className="text-sm text-green-700">{successMessage}</p>
          </div>
          <button
            onClick={() => setSuccessMessage("")}
            className="text-green-600 hover:text-green-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 animate-slideDown">
          <AlertCircle
            size={20}
            className="text-red-600 shrink-0 mt-0.5"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-800">Error!</p>
            <p className="text-sm text-red-700">{errorMessage}</p>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name, brand, model, or location..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9810fa]/20 focus:border-[#9810fa] transition-all"
          />
        </div>
        <div className="relative min-w-45">
          <Filter
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9810fa]/20 focus:border-[#9810fa] transition-all appearance-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="sell">Sell</option>
            <option value="maintenance">Maintenance</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <p className="text-xs text-gray-500">Total Cars</p>
          <p className="text-2xl font-bold text-gray-800">{listCars.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <p className="text-xs text-gray-500">Available</p>
          <p className="text-2xl font-bold text-green-600">
            {listCars.filter((c) => c.status === "available").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <p className="text-xs text-gray-500">Rented</p>
          <p className="text-2xl font-bold text-blue-600">
            {listCars.filter((c) => c.status === "rented").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <p className="text-xs text-gray-500">Maintenance</p>
          <p className="text-2xl font-bold text-yellow-600">
            {listCars.filter((c) => c.status === "maintenance").length}
          </p>
        </div>
      </div>

      {/* Cars Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading && listCars.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <svg
                className="animate-spin h-10 w-10 text-[#9810fa] mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-gray-500">Loading cars...</p>
            </div>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Car size={48} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No cars found</p>
              <p className="text-sm text-gray-400">
                Try adjusting your search or filter
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Car
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentCars.map((car) => (
                    <tr
                      key={car._id || car.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {car.images && car.images.length > 0 ? (
                            <img
                              src={car.images[0]}
                              alt={car.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Car size={20} className="text-gray-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-800">
                              {car.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {car.brand} {car.model}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-0.5">
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Calendar size={12} className="text-gray-400" />
                            {car.year}
                          </p>
                          <p className="text-xs text-gray-400">
                            {car.category} • {car.transmission}
                          </p>
                          <p className="text-xs text-gray-400">
                            {car.fuelType} • {car.seats} seats
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-800 flex items-center gap-1">
                          ₵
                          {car.price?.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">per day</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin size={14} className="text-gray-400" />
                          {car.location}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={car.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              // View car details
                              console.log("View car:", car._id);
                            }}
                            className="p-1.5 hover:bg-purple-50 rounded-lg transition-colors group"
                            title="View"
                          >
                            <Eye
                              size={16}
                              className="text-gray-400 group-hover:text-purple-600 transition-colors"
                            />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCar(car);
                              setShowDeleteModal(true);
                            }}
                            className="p-1.5 hover:bg-red-50 rounded-lg transition-colors group"
                            title="Delete"
                          >
                            <Trash2
                              size={16}
                              className="text-gray-400 group-hover:text-red-600 transition-colors"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredCars.length)} of{" "}
                  {filteredCars.length} cars
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteModal />

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ListCars;
