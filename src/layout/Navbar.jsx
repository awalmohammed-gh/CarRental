import { NavLink } from "react-router-dom";
import {
  Heart,
  User,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  CalendarDays,
  LogIn,
} from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setShowMobile(false);
    setOpenUser(false);
  };

  // Dynamic colors based on scroll state
  const textColor = scrolled ? "#0F172A" : "#FFFFFF";
  const iconColor = scrolled ? "#0F172A" : "#FFFFFF";
  const activeColor = "#F59E0B";
  const logoSpan1Color = scrolled ? "#2563EB" : "#FFFFFF";
  const logoSpan2Color = scrolled ? "#1E293B" : "#FFFFFF";

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F8FAFC] shadow-md border-b border-slate-200"
          : "bg-transparent"
      }`}
    >
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <NavLink to="/" onClick={() => setShowMobile(false)}>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              <span style={{ color: logoSpan1Color }}>Drive</span>
              <span style={{ color: logoSpan2Color }}>Ease</span>
            </h1>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className="text-base font-medium transition-colors duration-200 hover:text-[#F59E0B]"
                style={({ isActive }) => ({
                  color: isActive ? activeColor : textColor,
                })}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <NavLink
              to="/wishlist"
              className="hidden sm:block transition-opacity hover:opacity-80"
              onClick={handleLinkClick}
            >
              <Heart
                className="w-5 h-5"
                style={{ color: iconColor }}
              />
            </NavLink>

            {/* User */}
            <div className="relative">
              <button
                onClick={() => setOpenUser((prev) => !prev)}
                className="p-1 rounded-full transition-colors hover:bg-white/10"
              >
                <User
                  className="w-5 h-5"
                  style={{ color: iconColor }}
                />
              </button>

              {openUser && (
                <>
                  {/* backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setOpenUser(false)}
                  />

                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg py-2 z-20 border border-slate-100">
                    {isLoggedIn ? (
                      <div className="flex flex-col">
                        <NavLink
                          to="/bookings"
                          onClick={() => setOpenUser(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-[#0F172A] hover:bg-slate-50 hover:text-[#F59E0B] transition-colors"
                        >
                          <CalendarDays className="w-4 h-4" />
                          My Bookings
                        </NavLink>

                        <NavLink
                          to="/dashboard"
                          onClick={() => setOpenUser(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-[#0F172A] hover:bg-slate-50 hover:text-[#F59E0B] transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </NavLink>

                        <button
                          onClick={() => {
                            setIsLoggedIn(false);
                            setOpenUser(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-[#0F172A] hover:bg-slate-50 hover:text-[#F59E0B] transition-colors text-left w-full"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setIsLoggedIn(true);
                          setOpenUser(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-[#0F172A] hover:bg-slate-50 hover:text-[#F59E0B] transition-colors w-full text-left"
                      >
                        <LogIn className="w-4 h-4" />
                        Login
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setShowMobile(!showMobile)}
              className="md:hidden p-1 rounded-md transition-colors hover:bg-white/10"
            >
              {showMobile ? (
                <X className="w-6 h-6" style={{ color: iconColor }} />
              ) : (
                <Menu className="w-6 h-6" style={{ color: iconColor }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu - Always uses white background for readability */}
        {showMobile && (
          <div className="md:hidden py-4 border-t border-slate-100 bg-[#F8FAFC] rounded-b-lg">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  onClick={handleLinkClick}
                  className="px-2 py-1 text-base font-medium rounded-md transition-colors hover:bg-slate-100"
                  style={({ isActive }) => ({
                    color: isActive ? activeColor : "#0F172A",
                  })}
                >
                  {link.name}
                </NavLink>
              ))}

              <NavLink
                to="/wishlist"
                onClick={handleLinkClick}
                className="flex items-center gap-2 px-2 py-1 text-base font-medium text-[#0F172A] rounded-md transition-colors hover:bg-slate-100"
              >
                <Heart className="w-4 h-4" />
                Wishlist
              </NavLink>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;