import {createContext} from 'react';
import useApi from 'components/custom-hooks/useApi';
import GlobalLoading from 'components/loading-icon/GlobalLoading';

export const loadingContext = createContext();
export default function LoadingContext({children}) {
  const {globalLoading, makeRequest} = useApi();

  return (
    <loadingContext.Provider value={makeRequest}>
      {globalLoading && <GlobalLoading />}
      {children}
    </loadingContext.Provider>
  );
}
