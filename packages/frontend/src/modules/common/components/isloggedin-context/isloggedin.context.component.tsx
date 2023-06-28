import React, { createContext, useState } from 'react';
import { IIsLoggedInContext } from '../../types/props.types';

export const IsLoggedInContext = createContext<IIsLoggedInContext>({
  isLoggedIn: false,
  loggedIn: () => {},
  notLoggedIn: () => {}
});

export const IsLoggedInState = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loggedIn = () => setIsLoggedIn(true);

  const notLoggedIn = () => setIsLoggedIn(false);

  return (
    <IsLoggedInContext.Provider value={{ isLoggedIn, loggedIn, notLoggedIn }}>
      {children}
    </IsLoggedInContext.Provider>
  );
};
