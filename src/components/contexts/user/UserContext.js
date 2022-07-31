import {useState, createContext, useMemo, useEffect, useCallback} from 'react';
import LoadingIcon from 'components/loading-icon/LoadingIcon';
import GlobalLoading from 'components/loading-icon/GlobalLoading';
import styles from './UserContext.module.css';

export const userContext = createContext();

export default function UserContext({children}) {
  const [loggedIn, setLoggedIn] = useState(!!sessionStorage.getItem('accessToken'));
  const [globalLoading, setGlobalLoading] = useState(false);
  const [feedbackErrorMsg, setFeedbackErrorMsg] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const makeRequest = useCallback(async ({url = '', method = 'get', body}, feedbackMsg) => {
    try {
      setGlobalLoading(true);
      const data = await fetch[method](url, body);
      setGlobalLoading(false);
      if (feedbackMsg) setFeedbackMsg(feedbackMsg);
      return data;
    } catch (err) {
      if (err.status === 401) setLoggedIn(false);
      else setFeedbackErrorMsg('Ha ocurrido un error');
    }
  }, []);

  function useFetch({url = '', method = 'get', body}) {
    const [data, setData] = useState(null);
    useEffect(() => {
      try {
        (async () => {
          const data = await fetch[method](url, body);
          setData(data);
        })();
      } catch (err) {
        if (err.status === 401) setLoggedIn(false);
        else setFeedbackErrorMsg('Ha ocurrido un error');
      }
    }, [url, method, body]);
    return [!data && <LoadingIcon />, data, setData];
  }

  const clearUserFeedback = useCallback(() => {
    setFeedbackMsg('');
    setFeedbackErrorMsg('');
  }, [setFeedbackMsg]);

  useEffect(() => {
    setTimeout(() => clearUserFeedback(), 5000);
  }, [feedbackMsg, feedbackErrorMsg, clearUserFeedback]);

  const [loadingTechs, techs, setTechs] = useFetch({url: 'techs'});

  const [loadingUser, [user], setUser] = useFetch({url: 'users'});

  const contextObject = useMemo(
    () => ({
      user,
      setUser,
      loadingUser,
      techs,
      setTechs,
      loadingTechs,
      loggedIn,
      setLoggedIn,
      makeRequest,
    }),
    [loadingTechs, loadingUser, loggedIn, makeRequest, setTechs, setUser, techs, user],
  );
  return (
    <userContext.Provider value={contextObject}>
      {(feedbackErrorMsg || feedbackMsg) && (
        <FeedbackMsgModal
          feedbackErrorMsg={feedbackErrorMsg}
          feedbackMsg={feedbackMsg}
          clearUserFeedback={clearUserFeedback}
        />
      )}
      {globalLoading && <GlobalLoading />}
      {children}
    </userContext.Provider>
  );
}

function FeedbackMsgModal({feedbackErrorMsg, feedbackMsg, clearUserFeedback}) {
  return (
    <div
      className={`${styles[`feedbackMsg${feedbackErrorMsg || 'error'}Container`]} ${
        !feedbackMsg && styles.feedbackMsgContainerFadeOut
      }`}
    >
      <p className={styles.feedbackMsg}>{feedbackErrorMsg || feedbackMsg}</p>
      <button onClick={clearUserFeedback} className={styles.closeResponseModal}>
        X
      </button>
    </div>
  );
}
