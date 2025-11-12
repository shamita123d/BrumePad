import { useContext } from 'react';
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; // ← Import missing
import { AuthContext } from './context/AuthContext';
import Dashboard from './pages/Dashboard';

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="h-screen bg-gray-900 text-gray-100 font-mono">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={user ? <Dashboard /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </Router>
    </div>
  );
}
