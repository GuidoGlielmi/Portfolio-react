import {createContext, useMemo, useCallback, useContext} from 'react';
import {userFeedbackContext} from '../user-feedback/UserFeedbackContext';

export const userContext = createContext();

export default function UserContext({children}) {
  const {useFetch, makeRequest} = useContext(userFeedbackContext);

  const [loadingTechs, techs, setTechs] = useFetch({url: 'techs'});

  const [loadingUser, user, setUser] = useFetch({url: 'users'}, [], 0);

  const saveUser = useCallback(async () => {
    await makeRequest({url: 'users', body: user, method: 'put'}, 'User modified');
  }, [user, makeRequest]);

  const contextObj = useMemo(
    () => ({
      user,
      setUser,
      loadingUser,
      techs,
      setTechs,
      loadingTechs,
      saveUser,
    }),
    [loadingTechs, loadingUser, saveUser, setTechs, setUser, techs, user],
  );

  return <userContext.Provider value={contextObj}>{children}</userContext.Provider>;
}
