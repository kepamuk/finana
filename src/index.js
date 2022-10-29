import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import {store} from './app/store';
import './index.scss';
import {WaitingPayment} from "./components/WaitingPaymant";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WaitingPayment/>}/>
      </Routes>
    </BrowserRouter>
  </Provider>
);
