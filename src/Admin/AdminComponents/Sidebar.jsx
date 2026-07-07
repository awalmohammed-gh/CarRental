import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  List,
  Users,
  Store,
  CreditCard,
  LogOut,
  Package2Icon,
} from "lucide-react";

const Sidebar = () => {
  const navLinks = [
    { name: "Overview", path: "/admin", icon: LayoutDashboard },
    { name: "Add Cars", path: "/admin/add-cars", icon: Car },
    { name: "List Cars", path: "/admin/list-cars", icon: List },
    { name: "Orders", path: "/admin/orders", icon: Package2Icon },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Dealers", path: "/admin/dealers", icon: Store },
    { name: "Subscription", path: "/admin/subscription", icon: CreditCard },
  ];

  return (
    <div className="h-screen w-64 bg-white shadow-lg flex flex-col fixed left-0 top-0">
      {/* Logo / Brand */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold" style={{ color: "#9810fa" }}>
          Admin Panel
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${
                isActive
                  ? "bg-[#9810fa] text-white shadow-md"
                  : "text-gray-600 hover:bg-[#9810fa]/10 hover:text-[#9810fa]"
              }
            `}
          >
            <link.icon size={20} />
            <span className="font-medium">{link.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section with Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200"
          style={{
            backgroundColor: "#F59E0B",
            color: "white",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#d97706";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#F59E0B";
          }}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
