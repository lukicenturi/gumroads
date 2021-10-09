import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App/App';
import { ActionCableProvider } from 'react-actioncable-provider';

const API_BASE_WS_URL = process.env.REACT_APP_API_BASE_WS_URL;

ReactDOM.render(
  <ActionCableProvider url={API_BASE_WS_URL}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ActionCableProvider>,
  document.getElementById('root')
);
