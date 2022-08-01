import LoadingIcon from 'components/loading-icon/LoadingIcon';
import {useEffect, useState} from 'react';
import fetch from 'services/Fetch';

export default function useFetch({url = '', method = 'get', body}) {
  const [data, setData] = useState(null);
  const [feedbackErrorMsg, setFeedbackErrorMsg] = useState('');

  useEffect(() => {
    console.log(29347);
    try {
      (async () => {
        const data = await fetch[method](url, body);
        setData(data);
      })();
    } catch (err) {
      if (err.status === 403) setFeedbackErrorMsg('Ha ocurrido un error');
    }
  }, [url, method, body]);
  return [!data && <LoadingIcon />, data, setData];
}
