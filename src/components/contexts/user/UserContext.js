import {useState, createContext, useMemo, useEffect, useCallback} from 'react';
import LoadingIcon from 'components/loading-icon/LoadingIcon';
import GlobalLoading from 'components/loading-icon/GlobalLoading';
import fetch from 'services/Fetch';
import styles from './UserContext.module.css';

export const userContext = createContext();

export default function UserContext({children}) {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const [globalLoading, setGlobalLoading] = useState(false);
  const [feedbackErrorMsg, setFeedbackErrorMsg] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  useEffect(() => {
    !loggedIn && localStorage.removeItem('accessToken');
  }, [loggedIn]);

  const makeRequest = useCallback(async ({url = '', method = 'get', body, feedbackMsg}) => {
    setGlobalLoading(true);
    let data;
    try {
      data = await fetch[method](url, body);
      if (feedbackMsg) setFeedbackMsg(feedbackMsg);
      setGlobalLoading(false);
      return data;
    } catch (err) {
      if (err.status === 401) {
        setLoggedIn(false);
        setFeedbackErrorMsg('Please, log in');
      } else setFeedbackErrorMsg('Ha ocurrido un error');
      setGlobalLoading(false);
      throw Error(err);
    }
  }, []);

  function useFetch({url = '', method = 'get', body}, initialValue = null, index) {
    const [data, setData] = useState(initialValue);
    useEffect(() => {
      try {
        (async () => {
          const data = await fetch[method](url, body);
          setData(index !== undefined ? data[index] : data);
        })();
      } catch (err) {
        if (err.status === 500) setLoggedIn(false);
        else setFeedbackErrorMsg('Ha ocurrido un error');
      }
    }, [url, method, body, index]);
    return [(!data || !Object.values(data).length) && <LoadingIcon />, data, setData];
  }

  const clearUserFeedback = useCallback(() => {
    setFeedbackMsg('');
    setFeedbackErrorMsg('');
  }, [setFeedbackMsg]);

  /*   useEffect(() => {
    setTimeout(() => clearUserFeedback(), 5000);
  }, [feedbackMsg, feedbackErrorMsg, clearUserFeedback]); */

  const [loadingTechs, techs, setTechs] = useFetch({url: 'techs'});

  const [loadingUser, user, setUser] = useFetch({url: 'users'}, [], 0);
  // console.log(loadingUser, user);

  const saveUser = useCallback(async () => {
    await makeRequest({url: 'userss', body: user, method: 'put'});
  }, [user, makeRequest]);

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
      useFetch,
      saveUser,
    }),
    [loadingTechs, loadingUser, loggedIn, makeRequest, setTechs, setUser, techs, user, saveUser],
  );
  return (
    <userContext.Provider value={contextObject}>
      <FeedbackMsgModal
        feedbackErrorMsg={feedbackErrorMsg}
        feedbackMsg={feedbackMsg}
        clearUserFeedback={clearUserFeedback}
      />
      {globalLoading && <GlobalLoading />}
      {children}
    </userContext.Provider>
  );
}

function FeedbackMsgModal({feedbackErrorMsg, feedbackMsg, clearUserFeedback}) {
  return (
    <div
      className={`${styles.feedbackMsg} ${feedbackErrorMsg && styles.error} ${
        !feedbackMsg && !feedbackErrorMsg && styles.fadeOut
      }`}
    >
      <p>{feedbackErrorMsg || feedbackMsg}</p>
      <button onClick={clearUserFeedback} className={styles.closeFeedbackMsg}>
        X
      </button>
    </div>
  );
}
