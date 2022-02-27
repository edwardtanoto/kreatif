import { createContext, useState } from 'react';

export const UserContext = createContext({ user: null, username: null });

export const UserFormContext = createContext();

// This context provider is passed to any component requiring the context
export const UserFormProvider = ({ children }) => {
  const [userform, setUserForm] = useState("");

  return (
    <UserFormContext.Provider
      value={{
        userform,
        setUserForm
      }}
    >
      {children}
    </UserFormContext.Provider>
  );
};