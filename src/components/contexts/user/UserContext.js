import {useState, createContext, useMemo, useEffect, useCallback} from 'react';
import LoadingIcon from 'components/loading-icon/LoadingIcon';
import GlobalLoading from 'components/loading-icon/GlobalLoading';
import fetch from 'services/Fetch';
import styles from './UserContext.module.css';

export const userContext = createContext();

export default function UserContext({children}) {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const [isModalFadingOut, setIsModalFadingOut] = useState(true);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [feedbackErrorMsg, setFeedbackErrorMsg] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  function showFeedbackMsgModal(msg, error) {
    error ? setFeedbackErrorMsg(msg) : setFeedbackMsg(msg);
    setIsModalFadingOut(false);
  }

  const makeRequest = useCallback(async ({url = '', method = 'get', body}, feedbackMsg) => {
    setGlobalLoading(true);
    let data;
    try {
      data = await fetch[method](url, body);
      if (feedbackMsg) showFeedbackMsgModal(feedbackMsg);
      setGlobalLoading(false);
      return data;
    } catch (err) {
      if (err.status === 401) {
        setLoggedIn(false);
        showFeedbackMsgModal('Please, log in', true);
      } else showFeedbackMsgModal('Ha ocurrido un error', true);
      setGlobalLoading(false);
      throw Error(err.message);
    }
  }, []);

  function clearUserFeedbackMsg() {
    setIsModalFadingOut(true);
    setTimeout(() => {
      setFeedbackMsg('');
      setFeedbackErrorMsg('');
    }, 700);
  }

  function useFetch({url = '', method = 'get', body}, initialValue = null, index) {
    const [data, setData] = useState(initialValue);
    useEffect(() => {
      try {
        (async () => {
          const data = await fetch[method](url, body);
          setData(index !== undefined ? data[index] : data);
        })();
      } catch (err) {
        if (err.status === 401) setLoggedIn(false);
        else showFeedbackMsgModal('Ha ocurrido un error', true);
      }
    }, [url, method, body, index]);
    return [(!data || !Object.values(data).length) && <LoadingIcon />, data, setData];
  }

  useEffect(() => {
    setTimeout(() => (feedbackMsg || feedbackErrorMsg) && clearUserFeedbackMsg(), 5000);
  }, [feedbackMsg, feedbackErrorMsg]);

  useEffect(() => {
    !loggedIn && localStorage.removeItem('accessToken');
  }, [loggedIn]);

  const [loadingTechs, techs, setTechs] = useFetch({url: 'techs'});

  const [loadingUser, user, setUser] = useFetch({url: 'users'}, [], 0);

  const saveUser = useCallback(async () => {
    await makeRequest({url: 'users', body: user, method: 'put'}, 'User modified');
  }, [user, makeRequest]);

  return (
    <userContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
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
      }}
    >
      <FeedbackMsgModal
        feedbackErrorMsg={feedbackErrorMsg}
        feedbackMsg={feedbackMsg}
        isModalFadingOut={isModalFadingOut}
        clearUserFeedbackMsg={clearUserFeedbackMsg}
      />
      {globalLoading && <GlobalLoading />}
      {children}
    </userContext.Provider>
  );
}

const FeedbackMsgModal = ({
  feedbackErrorMsg,
  feedbackMsg,
  isModalFadingOut,
  clearUserFeedbackMsg,
}) => (
  <div
    className={`${styles.feedbackMsg} ${feedbackErrorMsg && styles.error} ${
      isModalFadingOut && styles.fadeOut
    }`}
  >
    <p>{feedbackErrorMsg || feedbackMsg}</p>
    <button onClick={clearUserFeedbackMsg} className={styles.closeFeedbackMsg}>
      X
    </button>
  </div>
);
