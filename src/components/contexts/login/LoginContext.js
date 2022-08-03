import {createContext, useMemo, useState} from 'react';

export const loginContext = createContext();

export default function LoginContext({children}) {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const contextObj = useMemo(() => ({loggedIn, setLoggedIn}), [loggedIn]);

  return <loginContext.Provider value={contextObj}>{children}</loginContext.Provider>;
}
