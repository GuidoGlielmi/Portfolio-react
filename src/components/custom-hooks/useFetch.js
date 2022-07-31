import LoadingIcon from 'components/loading-icon/LoadingIcon';
import {useEffect, useState} from 'react';
import fetch from 'services/Fetch';

export default function useFetching() {
  const [fetchInProgress, setFetchInProgress] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [responseStatus, setResponseStatus] = useState(200);

  const makeRequest = async (feedbackMsg, {url = '', method = 'get', body}) => {
    try {
      setFetchInProgress(true);
      const data = await fetch[method](url, body);
      setFetchInProgress(false);
      setFeedbackMsg(feedbackMsg);
      return data;
    } catch (err) {
      setResponseStatus(err.status);
    }
  };

  function useFetch({url = '', method = 'get', body}) {
    const [data, setData] = useState(null);
    useEffect(() => {
      try {
        (async () => {
          const data = await fetch[method](url, body);
          setData(data);
        })();
      } catch (err) {
        console.log(err.message);
      }
    }, [url, method, body]);
    return [!data && <LoadingIcon />, data, setData];
  }

  return [
    fetchInProgress,
    makeRequest,
    useFetch,
    feedbackMsg,
    setFeedbackMsg,
    responseStatus,
    setResponseStatus,
  ];
}
