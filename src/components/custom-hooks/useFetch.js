import LoadingIcon from 'components/loading-icon/LoadingIcon';
import {useEffect, useState} from 'react';
import fetchData from 'services/fetch';
export default function useFetch({url, method, body}) {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function getData() {
      const data = await fetchData[method](url, body);
      setData(data);
    }
    try {
      getData();
    } catch (err) {
      console.log(err.message);
    }
  }, [url, method, body]);
  return [!data && <LoadingIcon />, data, setData];
}
