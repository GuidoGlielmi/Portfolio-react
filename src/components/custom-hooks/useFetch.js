import {useState, useEffect} from 'react';
import fetch from 'services/Fetch';
import LoadingIcon from 'components/loading-icon/LoadingIcon';

export default function useFetch({url = '', method = 'get', body}, initialValue = null, index) {
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState(null);
  useEffect(() => {
    try {
      (async () => {
        const data = await fetch[method](url, body);
        setData(index !== undefined ? data[index] : data);
      })();
    } catch (err) {
      setError(err.status);
    }
  }, [url, method, body, index]);
  return [(!data || !Object.values(data).length) && <LoadingIcon />, data, setData, error];
}
