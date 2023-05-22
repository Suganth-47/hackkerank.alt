import React, { useState, } from 'react';

import './register.css';


const LoginPage = ({setusername}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const login = async () => {
    setIsLoading(true);

    try {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      var link = `http://localhost:3001/register?name=${username}&password=${password}`
      console.log(link);
      const response = await fetch(link, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result["register"]) {
        setusername(username);
        window.location.href = '/';
      }
      else{
        alert("failed to register");
      }

      console.log('result is: ', JSON.stringify(result, null, 4));

    } catch (err) {
      setErr(err.message);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };




  return (
    <div class="container2">
      {err && <h2>{err}</h2>}
      {isLoading && <h2>Loading...</h2>}
      <h1>Register</h1>
      <div class="form">
        <input type="text" placeholder="Username" id="username" />
        <input type="password" placeholder="Password" id="password" />
        <input type="password" placeholder="Confirm Password" id="cpassword" />
        <input type="submit" value="Submit" id="submit-btn" onClick={login} />
        <a href="/" class="back">Back</a>
      </div>
    </div>
  );
};


export default LoginPage;
