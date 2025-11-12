import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Home from './Home';

export default function Dashboard() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-100 font-mono">
      <header className="flex justify-between items-center p-4 bg-gray-850 shadow-md border-b border-gray-700">
        <h1 className="text-2xl font-bold text-cyan-400">
          📝 BrumPad - Welcome, {user?.username || 'User'}
        </h1>
        <button
          onClick={logoutUser}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl shadow-lg transition"
        >
          Logout
        </button>
      </header>

      <main className="flex-1 overflow-auto">
        <Home />
      </main>
    </div>
  );
}
