import React, { createContext, useState, useEffect } from 'react';

export const UserDataContex = createContext();

export const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Sync with localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save to localStorage on user update
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserDataContex.Provider value={{ user, setUser }}>
      {children}
    </UserDataContex.Provider>
  );
};

export default UserDataProvider
