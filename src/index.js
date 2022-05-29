import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App.js';
import { CategoriesProvider } from './contexts/categories.context.jsx';
import { CartProvider } from './contexts/cart.context.jsx';
import { store } from './store/store.js';

import './index.scss';


const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CategoriesProvider>
          <CartProvider>
            <App />    
          </CartProvider>
        </CategoriesProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);