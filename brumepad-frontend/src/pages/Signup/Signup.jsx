import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import logo from "../../assets/logo.jpg";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-[#0e0e1a] via-[#1a1a2e] to-[#141427] px-4">
      <div className="flex w-full max-w-5xl min-h-[540px] rounded-3xl overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.6)] border border-[#313148]">
        {/* Left Section */}
        <div className="relative w-1/2 hidden md:flex items-center justify-center bg-[#11112d]">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          <div className="relative z-10 flex flex-col items-center justify-center text-center px-8">
            <img
              src={logo}
              alt="BrumePad Logo"
              className="w-36 h-36 rounded-full object-cover mb-6 border-2 border-indigo-400 shadow-[0_0_15px_rgba(93,76,255,0.6)]"
            />
            <h1 className="text-4xl font-semibold tracking-[0.25em] text-white mb-3 drop-shadow-[0_0_15px_rgba(93,76,255,0.6)]">
              BRUMEPAD
            </h1>
            <p className="text-gray-300 text-sm max-w-xs leading-relaxed">
              Your cloud-powered space to code, collaborate, and create with
              ease.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 bg-[#0a0a1f] text-white flex items-center justify-center px-10 py-12">
          <div className="w-full max-w-md flex flex-col items-center gap-10">
            {/* Heading */}
            <div className="text-center">
              <h2 className="text-4xl font-semibold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-3 drop-shadow-[0_0_10px_rgba(93,76,255,0.5)]">
                Create your account
              </h2>
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-indigo-400 hover:text-indigo-300 underline-offset-2 hover:underline"
                >
                  Log in
                </a>
              </p>
            </div>

            {/* Form */}
            <form className="w-full flex flex-col gap-3">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="First name"
                  className="w-1/2 bg-[#1a1a26]/80 border border-[#2d2d44] rounded-lg px-5 py-3.5 text-sm text-center
                  outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-1/2 bg-[#1a1a26]/80 border border-[#2d2d44] rounded-lg px-5 py-3.5 text-sm text-center
                  outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-[#1a1a26]/80 border border-[#2d2d44] rounded-lg px-5 py-3.5 text-sm text-center
                outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="current-password"
                  className="w-full bg-[#1a1a26]/80 border border-[#2d2d44] rounded-lg px-5 py-3.5 text-sm 
                  outline-none focus:ring-2 focus:ring-indigo-500 transition-all pr-14"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm cursor-pointer hover:text-indigo-400 select-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                <input
                  type="checkbox"
                  className="accent-indigo-500 cursor-pointer"
                />
                <p>
                  I agree to the{" "}
                  <a href="#" className="text-indigo-400 hover:underline">
                    Terms & Conditions
                  </a>
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 
                transition-all rounded-lg py-3.5 font-semibold text-white shadow-[0_2px_10px_rgba(93,76,255,0.4)] hover:shadow-[0_4px_20px_rgba(93,76,255,0.5)]"
              >
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="mt-4 flex items-center gap-2 text-gray-500 w-full">
              <hr className="flex-1 border-gray-700" />
              <span className="text-xs uppercase tracking-wider">
                or continue with
              </span>
              <hr className="flex-1 border-gray-700" />
            </div>

            {/* Social Buttons */}
            <div className="flex justify-center gap-5 w-full">
              <button className="flex items-center justify-center gap-2 bg-[#1a1a26]/80 px-5 py-3 rounded-lg border border-[#2d2d44] hover:bg-[#24243a] transition-all hover:scale-[1.03] w-1/2">
                <FcGoogle size={20} /> <span className="text-sm">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-[#1a1a26]/80 px-5 py-3 rounded-lg border border-[#2d2d44] hover:bg-[#24243a] transition-all hover:scale-[1.03] w-1/2">
                <FaGithub size={20} /> <span className="text-sm">Github</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
