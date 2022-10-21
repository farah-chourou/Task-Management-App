import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import Store from './store/Store';
import setupInterceptors from "./services/setupInterceptors";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
  //Provider to connect our store and global states to our app -> all the app now has access to the store
  <Provider store={Store}> 
  <App />
</Provider>
);
setupInterceptors();


