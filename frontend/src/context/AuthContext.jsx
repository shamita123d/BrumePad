import jwtDecode from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🔹 Rehydrate user on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          username: decoded.username || 'User',
          id: decoded.id,
        });
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  // 🔹 When user logs in
  const loginUser = (data) => {
    localStorage.setItem('token', data.token);
    try {
      const decoded = jwtDecode(data.token);
      setUser({
        username: data.user?.username || decoded.username || 'User',
        id: decoded.id,
      });
    } catch (err) {
      console.error('Error decoding token:', err);
    }
  };

  // 🔹 When user logs out
  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
