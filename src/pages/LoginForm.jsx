import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  Car,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useCarRental } from "../context/CarRentalProvider";
import apis from "../../api/apis";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { currentState, setCurrentState, setIsLoggedIn } = useCarRental();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when user types
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Basic validation
      if (currentState === "login") {
        const { data } = await apis.post("/user/login", formData);
        if (data.success) {
          setSuccess(data.message);
          setIsLoggedIn(true);
          navigate("/")
        } else {
          setError(data.message);
        }
      } else {
        const { data } = await apis.post("/user/create-account", formData);
        if (data.success) {
          setSuccess(data.message);
          setIsLoggedIn(true);
         navigate("/")
        } else {
          setError(data.message);
        }
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const switchState = (state) => {
    setCurrentState(state);
    setError("");
    setSuccess("");
    setFormData({ fullname: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#9810fa]/5 via-white to-blue-600/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Brand/Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-3 bg-[#9810fa] rounded-2xl shadow-lg">
              <Car className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-800">
              Drive<span className="text-[#9810fa]">Ease</span>
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-700">
            {currentState === "login" ? "Welcome Back!" : "Create Account"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {currentState === "login"
              ? "Sign in to access your account"
              : "Join DriveEase and start your journey"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                <CheckCircle size={16} />
                {success}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                <span>⚠️</span>
                {error}
              </div>
            )}

            {/* Full Name - Signup only */}
            {currentState === "signup" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChanges}
                    placeholder="Mohammed Awal"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9810fa]/20 focus:border-[#9810fa] transition-all"
                    required={currentState === "signup"}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChanges}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9810fa]/20 focus:border-[#9810fa] transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChanges}
                  placeholder={
                    currentState === "login" ? "••••••••" : "Min 6 characters"
                  }
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9810fa]/20 focus:border-[#9810fa] transition-all"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {currentState === "login" && (
                <div className="text-right mt-1">
                  <button
                    type="button"
                    className="text-xs text-[#9810fa] hover:text-[#7a0cc9] font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#9810fa] text-white rounded-lg font-medium hover:bg-[#7a0cc9] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                  {currentState === "login"
                    ? "Signing in..."
                    : "Creating account..."}
                </>
              ) : (
                <>
                  {currentState === "login" ? (
                    <>
                      <LogIn size={20} />
                      Sign In
                    </>
                  ) : (
                    <>
                      <UserPlus size={20} />
                      Create Account
                    </>
                  )}
                </>
              )}
            </button>
          </form>

          {/* Switch between Login/Signup */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {currentState === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
              <button
                type="button"
                onClick={() =>
                  switchState(currentState === "login" ? "signup" : "login")
                }
                className="ml-2 text-[#9810fa] font-medium hover:text-[#7a0cc9] transition-colors items-center gap-1 inline-flex"
              >
                {currentState === "login" ? "Sign Up" : "Sign In"}
                <ArrowRight size={14} />
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
