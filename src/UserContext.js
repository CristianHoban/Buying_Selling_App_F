import React, { createContext, useContext, useState } from 'react';

// Create a context with default values for user and setUser function
const UserContext = createContext({
  user: null,
  setUser: () => {}
});

// Define the Provider component which will manage the user state
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // This will hold the user state

  // Value to be passed to context consumers
  const value = {
    user,
    setUser
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;

// Custom hook to use the context
export function useUser() {
  return useContext(UserContext);
}
