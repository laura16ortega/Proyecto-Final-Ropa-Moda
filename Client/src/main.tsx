import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "@mui/material/styles";
import credentials from "./auth_config.json";
import lightTheme from "./Theme";
import { Notification } from "./components/Notification/Notification";

const link = 'http://127.0.0.1:5173/'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          <Auth0Provider
            domain={credentials.domain}
            clientId={credentials.clientId}
            redirectUri={link}
          >
            <App />
            <Notification />
          </Auth0Provider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
