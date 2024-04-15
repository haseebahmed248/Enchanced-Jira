import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function GoogleApi(props) {
  const errorMessage_API = (error) => {
    console.log(error);
  };

  return (
    <GoogleLogin 
      onSuccess={(res) => {
        const decoded = jwtDecode(res?.credential);
        const { name, email, sub } = decoded;
        props.handleGoogleSuccess({ username: name, email: email, sub: sub });
      }} 
      onError={errorMessage_API} 
    />
  );
}

export default GoogleApi;