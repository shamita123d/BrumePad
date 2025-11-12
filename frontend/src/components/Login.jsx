import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from '../services/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { username, password });
      console.log("✅ Login Success:", res.data);
      loginUser(res.data);
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data || err.message);
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-linear-to-tr from-indigo-900 via-purple-900 to-pink-300 overflow-hidden">
      {/* Background lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-20 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-16 right-24 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-2xl animate-pulse-slower -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="relative w-96 p-8 flex flex-col gap-6 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500 z-10"
      >
        <h2 className="text-4xl font-extrabold text-white text-center tracking-widest drop-shadow-lg animate-pulse">
          Login to BrumePad
        </h2>
        <p className="text-center text-white/70 mb-4">
          Enter your credentials to access your workspace
        </p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-4 rounded-2xl bg-white/10 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-indigo-900 transition duration-300 backdrop-blur-sm shadow-md"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-4 rounded-2xl bg-white/10 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-indigo-900 transition duration-300 backdrop-blur-sm shadow-md"
          required
        />

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="mt-2 relative py-3 rounded-2xl font-bold text-white overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
        >
          <span className="absolute inset-0 bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient-x opacity-80"></span>
          <span className="relative z-10">Login</span>
        </button>

        <div className="text-center text-white/60 text-sm mt-4">
          Don’t have an account?{' '}
          <span
            className="text-purple-300 underline cursor-pointer hover:text-pink-300"
            onClick={() => navigate('/register')}
          >
            Sign Up
          </span>
        </div>
      </form>

      {/* Tailwind animations */}
      <style>
        {`
        @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 4s ease infinite;
        }
        .animate-pulse-slow {
            animation: pulse 6s ease-in-out infinite;
        }
        .animate-pulse-slower {
            animation: pulse 10s ease-in-out infinite;
        }
        `}
      </style>
    </div>
  );
}
