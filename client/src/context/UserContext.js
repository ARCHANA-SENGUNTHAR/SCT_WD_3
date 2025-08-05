import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Ensure username/email/token all exist
      if (parsedUser?.username && parsedUser?.email && parsedUser?.token) {
        setUser(parsedUser);
      } else {
        // Clear corrupted/partial data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (userData) => {
  const safeUser = {
    username: userData.username || '',
    email: userData.email || '',
    token: userData.token || '',
    isAdmin: userData.isAdmin || false,  // ✅ Add this line
  };
  localStorage.setItem('user', JSON.stringify(safeUser));
  localStorage.setItem('token', safeUser.token);
  setUser(safeUser);
};

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
