import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
export const userApi = axios.create({
  baseURL: 'http://localhost:8080',
});
export const adminApi = axios.create({
  baseURL: 'http://localhost:8080',
});
export const loginApi = axios.create({
  baseURL: 'http://localhost:8080',
});
adminApi.interceptors.request.use((req) => {
  const token = sessionStorage.getItem('accessToken');
  req.headers['Authorization'] = `Bearer ${token}`;
  console.log(req);
  return req;
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
