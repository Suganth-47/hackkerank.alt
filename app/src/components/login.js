import React, { useState, } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Loading from './loading';

import './login.css';


const LoginPage = ({ setusername }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const location = useLocation();
  var data = location.state;


  const login = async () => {
    setIsLoading(true);

    try {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      var link = `http://localhost:3001/login?name=${username}&password=${password}`
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
      if (result["login"]) {
        setusername(username);
        console.log("setting username");
        data = { username: username, login: true };
        //        window.location.href = '/';
        navigate("/", { state: data });
      }
      else {
        alert("password is false");
      }

      console.log('result is: ', JSON.stringify(result, null, 4));

    } catch (err) {
      setErr(err.message);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    data = {login:false}
    navigate("/", { state: data });
  };

  if (!data.login) {
    return (
      <div class="container2">
        {err && <h2>{err}</h2>}
        {isLoading && <Loading/>}
        <h1>Login</h1>
        <div class="form">
          <input type="text" placeholder="Username" id="username" />
          <input type="password" placeholder="Password" id="password" />
          <input type="submit" value="Submit" id="submit-btn" onClick={login} />
          <a href="/" class="back">Back</a>
          <a href="/signup" class="signup">New user? Sign up now</a>
        </div>
      </div>
    );
  }
  else {
    return (
      <div class="container2">
        <div class="form">
          <h1>Logout</h1>
          <h2>Already logged in as {data.username}</h2>
          <button class="logout-btn" onClick={logout} >Logout here</button>
        </div>
      </div>
    )
  }
};


export default LoginPage;

