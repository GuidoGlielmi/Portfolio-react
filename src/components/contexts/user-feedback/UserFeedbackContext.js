import {useState, createContext, useEffect, useCallback, useContext} from 'react';
import LoadingIcon from 'components/loading-icon/LoadingIcon';
import GlobalLoading from 'components/loading-icon/GlobalLoading';
import fetch from 'services/Fetch';
import {loginContext} from '../login/LoginContext';
import styles from './UserFeedbackContext.module.css';

export const userFeedbackContext = createContext();

export default function UserFeedbackContext({children}) {
  const {loggedIn, setLoggedIn} = useContext(loginContext);

  const [isModalFadingOut, setIsModalFadingOut] = useState(true);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [feedbackErrorMsg, setFeedbackErrorMsg] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  function showFeedbackMsgModal(msg, error) {
    error ? setFeedbackErrorMsg(msg) : setFeedbackMsg(msg);
    setIsModalFadingOut(false);
  }

  function clearUserFeedbackMsg() {
    setIsModalFadingOut(true);
    setTimeout(() => {
      setFeedbackMsg('');
      setFeedbackErrorMsg('');
    }, 700);
  }

  const makeRequest = useCallback(
    async ({url = '', method = 'get', body}, feedbackMsg) => {
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
    },
    [setLoggedIn],
  );

  function useFetch({url = '', method = 'get', body}, initialValue = null, index) {
    const [data, setData] = useState(initialValue);
    useEffect(() => {
      try {
        (async () => {
          const data = await fetch[method](url, body);
          setData(index !== undefined ? data[index] : data);
        })();
      } catch (err) {
        showFeedbackMsgModal('Ha ocurrido un error', true);
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

  return (
    <userFeedbackContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        makeRequest,
        useFetch,
        showFeedbackMsgModal,
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
    </userFeedbackContext.Provider>
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
