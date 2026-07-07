import React, { useEffect, useState } from "react";
import { buyingOrders, rentalOrders } from "../../assets/data";
import { CheckCircle, Clock, XCircle, Eye } from "lucide-react";

const OverviewRentals = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(rentalOrders.slice());
  }, []);

  // Get recent 5 orders
  const recentOrders = orders.slice(0, 5);

  // Payment status badge
  const PaymentBadge = ({ status }) => {
    const config = {
      Paid: { color: "bg-green-100 text-green-700", icon: CheckCircle },
      Pending: { color: "bg-yellow-100 text-yellow-700", icon: Clock },
      Failed: { color: "bg-red-100 text-red-700", icon: XCircle },
    };

    const { color, icon: Icon } = config[status] || config["Pending"];

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}
      >
        <Icon size={12} />
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">Recent Rentals</h3>
        <span className="text-xs text-gray-400">Last 5 orders</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recentOrders.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-8 text-center text-gray-400 text-sm"
                >
                  No orders found
                </td>
              </tr>
            ) : (
              recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-[#9810fa]">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-gray-400">
                        {order.customerPhone}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700">{order.carName}</p>
                    <p className="text-xs text-gray-400">
                      {order.totalDays} days
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-800">
                      {order.totalAmount.toLocaleString("en-GH", {
                        style: "currency",
                        currency: "GHS",
                      })}
                    </p>
                    <p className="text-xs text-gray-400">
                      {order.pricePerDay.toLocaleString("en-GH", {
                        style: "currency",
                        currency: "GHS",
                      })}
                      /day
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <PaymentBadge status={order.paymentStatus} />
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors group">
                      <Eye
                        size={16}
                        className="text-gray-400 group-hover:text-[#9810fa] transition-colors"
                      />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {recentOrders.length > 0 && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Showing {recentOrders.length} recent orders
          </span>
          <button className="text-xs font-medium text-[#9810fa] hover:text-[#7a0cc9] transition-colors">
            View All →
          </button>
        </div>
      )}
    </div>
  );
};

export default OverviewRentals;
