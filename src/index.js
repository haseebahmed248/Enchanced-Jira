  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import './index.css';
  import App from './App';
  import { GoogleOAuthProvider } from '@react-oauth/google';
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
    <GoogleOAuthProvider clientId="649554462414-1qst92ts1uco2rbp3bi6iajcf6u1uqle.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    </React.StrictMode>
  );

