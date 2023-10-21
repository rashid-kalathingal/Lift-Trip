import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import ChatProvider from './Context/ChatProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

const client_id =
  '2919663798-lkeijcb3g0f8mdb6utrmmj3rhanb87b5.apps.googleusercontent.com';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={client_id}>
    <ChatProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <ToastContainer />
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ChatProvider>
  </GoogleOAuthProvider>
);
