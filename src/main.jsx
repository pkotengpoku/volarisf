import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
{/*import {persistor,  store } from './redux/store.js'*/}
import { Provider } from 'react-redux'
{/*import { PersistGate } from 'redux-persist/integration/react'*/}
import reportWebVitals from "./reportWebVitals";
import Store from "./redux/store";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    {/*< PersistGate loading= {null} persistor = {persistor}>*/}
    <App />
    {/*</PersistGate>*/}
  </Provider>,
    document.getElementById("root")
);

reportWebVitals();

