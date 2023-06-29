import { createContext, useContext, useState } from 'react';

export const UserNameContext = createContext();

export const UserNameProvider = ({ children }) => {
  const [userName, setUserName] = useState(localStorage.getItem('isLoggedIn'));

  return (
    <UserNameContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserNameContext.Provider>
  );
};

export const useUserName = () => useContext(UserNameContext);
