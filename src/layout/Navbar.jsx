import { NavLink, useNavigate } from "react-router-dom";
import {
  Heart,
  User,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  CalendarDays,
  LogIn,
  ChevronDown,
  Sparkles,
  Store,
  HeartIcon,
  Settings,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useCarRental } from "../context/CarRentalProvider";
import apis from "../../api/apis";
import toast from "react-hot-toast";

const Navbar = () => {
  const { currentState, setCurrentState, isLoggedIn, setIsLoggedIn } =
    useCarRental();
  const [isDealer, setIsDealer] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef(null);

  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Scroll effect with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setOpenUser(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (showMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showMobile]);

  const handleLinkClick = () => {
    setShowMobile(false);
    setOpenUser(false);
  };

  const handleWishlistClick = () => {
    setShowMobile(false);
    setOpenUser(false);
  };

  const handleBecomeDealer = async () => {
    try {
      setIsDealer(true);
      setOpenUser(false);
      console.log("User became a dealer!");
    } catch (error) {
      console.error("Failed to become dealer:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await apis.post("/user/logout");
      if (data.success) {
        toast.success(data.message);
        setIsLoggedIn(false);
        setIsDealer(false);
        setOpenUser(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  const handleSignIn = () => {
    setIsLoggedIn(true);
    setOpenUser(false);
    navigate("/login");
    setCurrentState("login");
    // Add your sign-in logic here
  };

  const handleSignUp = () => {
    setIsLoggedIn(true);
    setOpenUser(false);
    setCurrentState("signup");
    navigate("/login");
    // Add your sign-up logic here
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-slate-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <NavLink
            to="/"
            onClick={() => setShowMobile(false)}
            className="group relative"
          >
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight transition-transform duration-300 group-hover:scale-105">
              <span
                className={`transition-colors duration-300 ${
                  scrolled ? "text-[#2563EB]" : "text-white"
                }`}
              >
                Drive
              </span>
              <span
                className={`transition-colors duration-300 ${
                  scrolled ? "text-[#1E293B]" : "text-white"
                }`}
              >
                Ease
              </span>
            </h1>
            <div
              className={`absolute -bottom-1 left-0 h-0.5 bg-[#F59E0B] transition-all duration-300 ${
                scrolled ? "w-0 group-hover:w-full" : "w-full"
              }`}
            />
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                    isActive
                      ? "text-[#F59E0B]"
                      : scrolled
                        ? "text-[#0F172A] hover:text-[#F59E0B]"
                        : "text-white hover:text-[#F59E0B]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#F59E0B] transition-all duration-300 rounded-full ${
                        isActive ? "w-3/4" : "w-0 group-hover:w-3/4"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Wishlist Button */}
            <NavLink
              to="/wishlist"
              onClick={handleWishlistClick}
              className={({ isActive }) =>
                `relative p-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-[#F59E0B] bg-[#F59E0B]/10"
                    : scrolled
                      ? "text-[#0F172A] hover:bg-slate-100"
                      : "text-white hover:bg-white/10"
                }`
              }
            >
              <Heart className="w-5 h-5" />
              {/* Wishlist badge - can be made dynamic */}
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F59E0B] text-white text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </NavLink>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setOpenUser(!openUser)}
                className={`relative p-2 rounded-full transition-all duration-300 group ${
                  scrolled
                    ? "text-[#0F172A] hover:bg-slate-100"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <User className="w-5 h-5" />
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 transition-all duration-300 ${
                    isLoggedIn ? "w-1.5 h-1.5 bg-green-500 rounded-full" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 origin-top-right ${
                  openUser
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                {/* User Info Header */}
                <div className="px-6 py-4 bg-linear-to-r from-[#2563EB]/5 to-[#F59E0B]/5 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">
                        {isLoggedIn ? "Welcome back!" : "Join DriveEase"}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {isLoggedIn
                          ? "Manage your account"
                          : "Sign in for the full experience"}
                      </p>
                    </div>
                    {isLoggedIn && isDealer && (
                      <span className="px-2 py-1 text-xs font-medium text-[#F59E0B] bg-[#F59E0B]/10 rounded-full">
                        Dealer
                      </span>
                    )}
                  </div>
                </div>

                {isLoggedIn ? (
                  <div className="py-2">
                    <NavLink
                      to="/bookings"
                      onClick={() => setOpenUser(false)}
                      className="flex items-center gap-3 px-6 py-3 text-sm text-[#0F172A] hover:bg-slate-50 transition-colors group"
                    >
                      <CalendarDays className="w-4 h-4 text-slate-400 group-hover:text-[#F59E0B] transition-colors" />
                      <span>My Bookings</span>
                    </NavLink>

                    <NavLink
                      to="/settings"
                      onClick={() => setOpenUser(false)}
                      className="flex items-center gap-3 px-6 py-3 text-sm text-[#0F172A] hover:bg-slate-50 transition-colors group"
                    >
                      <Settings className="w-4 h-4 text-slate-400 group-hover:text-[#F59E0B] transition-colors" />
                      <span>Settings</span>
                    </NavLink>

                    {/* Dealer Section */}
                    {isDealer ? (
                      <NavLink
                        to="/dealer-dashboard"
                        onClick={() => setOpenUser(false)}
                        className="flex items-center gap-3 px-6 py-3 text-sm text-[#0F172A] hover:bg-slate-50 transition-colors group"
                      >
                        <Store className="w-4 h-4 text-slate-400 group-hover:text-[#F59E0B] transition-colors" />
                        <span>Dealer Dashboard</span>
                      </NavLink>
                    ) : (
                      <button
                        onClick={handleBecomeDealer}
                        className="flex items-center gap-3 px-6 py-3 text-sm text-[#0F172A] hover:bg-slate-50 transition-colors w-full group"
                      >
                        <Sparkles className="w-4 h-4 text-slate-400 group-hover:text-[#F59E0B] transition-colors" />
                        <span>Become a Dealer</span>
                      </button>
                    )}

                    <div className="border-t border-slate-100 my-2" />

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-6 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left group"
                    >
                      <LogOut className="w-4 h-4 group-hover:text-red-600 transition-colors" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="py-2 space-y-1">
                    <button
                      onClick={handleSignUp}
                      className="w-full mx-2 px-4 py-2.5 bg-[#2563EB] text-white text-sm font-medium rounded-xl hover:bg-[#2563EB]/90 transition-colors"
                    >
                      Sign Up Free
                    </button>

                    <button
                      onClick={handleSignIn}
                      className="flex items-center gap-3 px-6 py-3 text-sm text-[#0F172A] hover:bg-slate-50 transition-colors w-full group"
                    >
                      <LogIn className="w-4 h-4 text-slate-400 group-hover:text-[#F59E0B] transition-colors" />
                      <span>Sign In</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setShowMobile(!showMobile)}
              className={`md:hidden relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                scrolled
                  ? "text-[#0F172A] hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5">
                <span
                  className={`absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                    showMobile ? "rotate-45 top-2" : "top-0"
                  }`}
                />
                <span
                  className={`absolute block w-5 h-0.5 bg-current top-2 transition-all duration-300 ${
                    showMobile ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                    showMobile ? "-rotate-45 top-2" : "top-4"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
            showMobile ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setShowMobile(false)}
        />

        {/* Mobile Menu Panel */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${
            showMobile ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">
                <span className="text-[#2563EB]">Drive</span>
                <span className="text-[#1E293B]">Ease</span>
              </h2>
              <button
                onClick={() => setShowMobile(false)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-[#0F172A]" />
              </button>
            </div>

            <nav className="space-y-1">
              {navLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-[#F59E0B]/10 text-[#F59E0B]"
                        : "text-[#0F172A] hover:bg-slate-50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <NavLink
                to="/wishlist"
                onClick={handleWishlistClick}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-[#0F172A] hover:bg-slate-50 transition-all duration-300"
              >
                <Heart className="w-5 h-5" />
                Wishlist
              </NavLink>

              {/* Mobile Dealer Section */}
              {isLoggedIn && (
                <>
                  {isDealer ? (
                    <NavLink
                      to="/dealer-dashboard"
                      onClick={handleLinkClick}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-[#0F172A] hover:bg-slate-50 transition-all duration-300"
                    >
                      <Store className="w-5 h-5" />
                      Dealer Dashboard
                    </NavLink>
                  ) : (
                    <button
                      onClick={() => {
                        handleBecomeDealer();
                        setShowMobile(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-[#0F172A] hover:bg-slate-50 transition-all duration-300 w-full"
                    >
                      <Sparkles className="w-5 h-5" />
                      Become a Dealer
                    </button>
                  )}
                </>
              )}
            </nav>

            <div className="mt-8 p-6 bg-linear-to-br from-[#2563EB]/5 to-[#F59E0B]/5 rounded-2xl">
              <Sparkles className="w-6 h-6 text-[#F59E0B] mb-3" />
              <p className="text-sm font-medium text-[#0F172A] mb-1">
                {isLoggedIn ? "Welcome back!" : "Join DriveEase"}
              </p>
              <p className="text-xs text-slate-500">
                {isLoggedIn
                  ? isDealer
                    ? "Manage your dealership and listings"
                    : "Manage your bookings and preferences"
                  : "Sign up for exclusive deals and easier bookings"}
              </p>
              {isLoggedIn && isDealer && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="px-2 py-1 text-xs font-medium text-[#F59E0B] bg-[#F59E0B]/10 rounded-full">
                    Dealer
                  </span>
                </div>
              )}
            </div>

            {/* Mobile Auth Buttons */}
            {!isLoggedIn && (
              <div className="mt-4 space-y-2">
                <button
                  onClick={handleSignUp}
                  className="w-full px-4 py-2.5 bg-[#2563EB] text-white text-sm font-medium rounded-xl hover:bg-[#2563EB]/90 transition-colors"
                >
                  Sign Up Free
                </button>
                <button
                  onClick={handleSignIn}
                  className="w-full px-4 py-2.5 border border-slate-200 text-[#0F172A] text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Sign In
                </button>
              </div>
            )}

            {isLoggedIn && (
              <button
                onClick={() => {
                  handleLogout();
                  setShowMobile(false);
                }}
                className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-2.5 text-red-600 text-sm font-medium rounded-xl hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
