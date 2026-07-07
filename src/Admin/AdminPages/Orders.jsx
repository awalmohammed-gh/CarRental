import React, { useEffect, useState } from "react";
import { rentalOrders } from "../../assets/data";
import {
  CheckCircle,
  Clock,
  XCircle,
  Calendar,
  User,
  Car,
  DollarSign,
  Search,
  Filter,
} from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    setOrders(rentalOrders.slice());
  }, []);

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || order.orderStatus === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      Confirmed: { color: "bg-blue-100 text-blue-700", icon: CheckCircle },
      Pending: { color: "bg-yellow-100 text-yellow-700", icon: Clock },
      Completed: { color: "bg-green-100 text-green-700", icon: CheckCircle },
      Cancelled: { color: "bg-red-100 text-red-700", icon: XCircle },
    };

    const config = statusConfig[status] || statusConfig["Pending"];
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        <Icon size={14} />
        {status}
      </span>
    );
  };

  // Payment status badge
  const PaymentStatusBadge = ({ status }) => {
    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
          status === "Paid"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {status === "Paid" ? <CheckCircle size={14} /> : <Clock size={14} />}
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Rental Orders</h2>
          <p className="text-gray-500 text-sm">
            Manage all rental orders and their status
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            Total Orders:{" "}
            <span className="font-bold text-[#9810fa]">{orders.length}</span>
          </span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by customer, car, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9810fa]/20 focus:border-[#9810fa] transition-all"
          />
        </div>
        <div className="relative">
          <Filter
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9810fa]/20 focus:border-[#9810fa] transition-all appearance-none bg-white"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dealer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pickup - Return
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Car size={48} className="text-gray-300" />
                      <p>No orders found</p>
                      <p className="text-sm text-gray-400">
                        Try adjusting your search or filter
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-800">
                          {order.carName}
                        </p>
                        <p className="text-xs text-gray-500">ID: {order.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-800 flex items-center gap-2">
                          <User size={14} className="text-gray-400" />
                          {order.customerName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.customerPhone}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">
                        {order.dealerName}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs">
                          <Calendar size={14} className="text-[#9810fa]" />
                          <span className="text-gray-600">
                            {order.pickupDate}
                          </span>
                          <span className="text-gray-300">→</span>
                          <span className="text-gray-600">
                            {order.returnDate}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {order.totalDays} days
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-800 flex items-center gap-1">
                          {order.totalAmount.toLocaleString("en-GH",{
                            style:"currency",
                            currency:"GHS"
                          })}
                        </p>
                        <p className="text-xs text-gray-400">
                          ₵{order.pricePerDay}/day
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <PaymentStatusBadge status={order.paymentStatus} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.orderStatus} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with stats */}
        {filteredOrders.length > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-sm">
            <span className="text-gray-600">
              Showing{" "}
              <span className="font-medium">{filteredOrders.length}</span> of{" "}
              <span className="font-medium">{orders.length}</span> orders
            </span>
            <div className="flex gap-4 text-gray-600">
              <span>
                 Total Revenue:{" "}
                <span className="font-bold text-[#9810fa]">
                  ₵
                  {filteredOrders
                    .reduce((sum, order) => sum + order.totalAmount, 0)
                    .toLocaleString()}
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
