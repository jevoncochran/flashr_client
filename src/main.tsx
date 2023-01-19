import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import './index.css'
import { Provider } from "react-redux";
import { store } from "./app/store";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/api'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
