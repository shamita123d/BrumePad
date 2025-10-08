import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg"; // Add your logo here

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Login Card */}
      <div className="border-20 border-white bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 flex flex-col gap-6 transform transition-transform hover:scale-105">
        {/* Logo & Header */}
        <div className="flex flex-col items-center gap-3">
          <img
            src={logo}
            alt="BrumePad Logo"
            className="w-20 h-20 rounded-full shadow-md"
          />
          <p className="dark:text-blue-800 font-bold text-md">BRUMEPAD LOGIN</p>
          <h1 className="text-4xl font-bold text-gray-800">Welcome Back!</h1>
          <p className="text-gray-500 text-sm text-center">
            Enter your credentials to access your workspace
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4 pl-8">
          {" "}
          {/* shifted form slightly right */}
          <div className="flex flex-col justify-center gap-2">
            <label htmlFor="email" className="text-gray-800 font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password" className="text-gray-800 font-medium">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="w-3/4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-14 transition"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-indigo-600 select-none"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <div className="flex justify-around items-center text-sm text-gray-600 pr-8">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-indigo-500" />
              Remember me
            </label>
            <span className="text-indigo-700 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>
          <div className="flex flex-col gap-5 justify-center items-center">
            <button
              type="submit"
              className="w-3/4 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500 transition"
            >
              Login
            </button>

            {/* Google Button */}
            <button
              type="button"
              className="flex w-3/4 items-center bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition justify-center gap-2"
            >
              Continue with Google
            </button>
          </div>
        </form>

        {/* Sign up link */}
        <p className="text-center text-gray-800 text-sm mt-2">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-700 hover:underline cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
