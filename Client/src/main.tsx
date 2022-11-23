import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import credentials from './auth_config.json';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Auth0Provider domain={credentials.domain} clientId={credentials.clientId}
    redirectUri={window.location.href} useRefreshTokens cacheLocation="localstorage">
        <App />
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)