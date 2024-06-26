import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
//import AppWithReducers from './AppWithReducers';
import AppWithRedux from './AppWithRedux';
import { Provider } from 'react-redux';
import { store } from './state/store';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
     <React.StrictMode>
    <AppWithRedux />
  </React.StrictMode>
  </Provider>
 
);

