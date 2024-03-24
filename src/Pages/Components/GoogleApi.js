import React from 'react';
import { GoogleLogin } from '@react-oauth/google';


function GoogleApi({ onSuccess }) { 
  const responseMessage_API = (response) => {

    const { profile, credential } = response;
    //const { email, given_name, family_name } = profile;
    console.log(profile + " |  " + credential)
    const { email } = credential;
  
  console.log(email);
  fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: {
      Authorization: `Bearer ${credential}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const { email, given_name, family_name } = data;
      const username = `${given_name} ${family_name}`;
      onSuccess({ username, email });
    })
    .catch((error) => {
      console.error('Error fetching user profile:', error);
    });
    //const username = given_name + " " + family_name;
    //onSuccess({ username: name, email });
  
  };

  const errorMessage_API = (error) => {
    console.log(error);
  };
  
  return (
    <GoogleLogin onSuccess={responseMessage_API} onError={errorMessage_API} />
  );
}

export default GoogleApi;