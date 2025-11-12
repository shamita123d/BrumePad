import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';

export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post('/auth/register', { username, password });
            setMessage(res.data.message);
            setUsername('');
            setPassword('');
            setConfirmPassword('');

            // Auto-redirect to login after success
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-300 overflow-hidden">
            <form
                onSubmit={handleRegister}
                className="relative w-96 p-8 flex flex-col gap-6 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500 z-10"
            >
                <h2 className="text-4xl font-extrabold text-white text-center tracking-widest drop-shadow-lg animate-pulse">
                    Register
                </h2>

                {message && <p className="text-green-400 text-center">{message}</p>}
                {error && <p className="text-red-400 text-center">{error}</p>}

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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="p-4 rounded-2xl bg-white/10 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-indigo-900 transition duration-300 backdrop-blur-sm shadow-md"
                    required
                />

                <button
                    type="submit"
                    className="mt-2 relative py-3 rounded-2xl font-bold text-white overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
                >
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient-x opacity-80"></span>
                    <span className="relative z-10">Sign Up</span>
                </button>

                <div className="text-center text-white/60 text-sm mt-4">
                    Already have an account?{' '}
                    <span
                        className="text-purple-300 underline cursor-pointer hover:text-pink-300"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </span>
                </div>
            </form>

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
                .animate-pulse {
                    animation: pulse 2s ease-in-out infinite;
                }
                `}
            </style>
        </div>
    );
}
