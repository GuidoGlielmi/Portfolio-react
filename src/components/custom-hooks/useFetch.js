import {useState, useEffect, useContext} from 'react';
import fetch from 'services/Fetch';
import LoadingIcon from 'components/loading-icon/LoadingIcon';
import {userFeedbackContext} from 'components/contexts/user-feedback/UserFeedbackContext';

export default function useFetch({url = '', method = 'get', body}, initialValue = null, index) {
  const {showFeedbackMsgModal} = useContext(userFeedbackContext);
  const [data, setData] = useState(initialValue);
  useEffect(() => {
    (async () => {
      try {
        const data = await fetch[method](url, body);
        setData(index !== undefined ? data[index] : data);
      } catch (err) {
        // if the token expires, it return 500
        showFeedbackMsgModal('Ha ocurrido un error', true);
      }
    })();
  }, [url, method, body, index, showFeedbackMsgModal]);
  return [(!data || !Object.values(data).length) && <LoadingIcon />, data, setData];
}
