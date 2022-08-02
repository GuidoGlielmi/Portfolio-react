// import {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import LoginContext from 'components/contexts/login/LoginContext';
import UserFeedbackContext from 'components/contexts/user-feedback/UserFeedbackContext';
import UserContext from 'components/contexts/user/UserContext';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  // <StrictMode>
  <LoginContext>
    <UserFeedbackContext>
      <UserContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContext>
    </UserFeedbackContext>
  </LoginContext>,
  // </StrictMode>
  document.getElementById('root'),
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
