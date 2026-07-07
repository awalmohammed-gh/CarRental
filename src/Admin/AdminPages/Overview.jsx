import React from "react";
import {
  ShoppingBag,
  Users,
  Store,
  Car,
  TrendingUp,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import OverviewRentals from "../AdminComponents/OverviewRentals";
import OverviewOrder from "../AdminComponents/OverviewOrder";

const Overview = () => {
  const stats = {
    orders: 10,
    users: 15,
    dealers: 8,
    rentals: 25,
    // Mock percentage changes (you can calculate these dynamically)
    changes: {
      orders: 12,
      users: 8,
      dealers: -3,
      rentals: 15,
    },
  };

  const statCards = [
    {
      title: "Total Orders",
      value: stats.orders,
      icon: ShoppingBag,
      color: "text-[#9810fa]",
      bgColor: "bg-[#9810fa]/10",
      change: stats.changes.orders,
      isPositive: stats.changes.orders > 0,
    },
    {
      title: "Total Users",
      value: stats.users,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-600/10",
      change: stats.changes.users,
      isPositive: stats.changes.users > 0,
    },
    {
      title: "Total Dealers",
      value: stats.dealers,
      icon: Store,
      color: "text-[#F59E0B]",
      bgColor: "bg-[#F59E0B]/10",
      change: stats.changes.dealers,
      isPositive: stats.changes.dealers > 0,
    },
    {
      title: "Active Rentals",
      value: stats.rentals,
      icon: Car,
      color: "text-green-600",
      bgColor: "bg-green-600/10",
      change: stats.changes.rentals,
      isPositive: stats.changes.rentals > 0,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm">
          Welcome back! Here's what's happening with your platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="flex items-center gap-1">
                <span
                  className={`text-xs font-medium ${stat.isPositive ? "text-green-600" : "text-red-600"}`}
                >
                  {stat.isPositive ? "+" : ""}
                  {stat.change}%
                </span>
                {stat.isPositive ? (
                  <ArrowUp className="w-3 h-3 text-green-600" />
                ) : (
                  <ArrowDown className="w-3 h-3 text-red-600" />
                )}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Section */}
      <div className="mt-8 flex flex-col gap-8">
        <OverviewRentals/>
        <OverviewOrder/>
      </div>

      {/* Quick Actions (Optional) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-linear-to-r from-[#9810fa] to-purple-600 rounded-xl p-6 text-white">
          <h3 className="font-semibold">Add New Car</h3>
          <p className="text-sm opacity-90 mt-1">
            List a new vehicle for rental
          </p>
          <button className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Add Car →
          </button>
        </div>
        <div className="bg-linear-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <h3 className="font-semibold">Manage Users</h3>
          <p className="text-sm opacity-90 mt-1">
            View and manage platform users
          </p>
          <button className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            View Users →
          </button>
        </div>
        <div className="bg-linear-to-r from-[#F59E0B] to-amber-600 rounded-xl p-6 text-white">
          <h3 className="font-semibold">Subscription Plans</h3>
          <p className="text-sm opacity-90 mt-1">Manage dealer subscriptions</p>
          <button className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            View Plans →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
