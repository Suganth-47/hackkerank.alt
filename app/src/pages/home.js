import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Layout from '../components/nav';

import '../icons/lake.jpg';

import "./home.css";

function Home({ username }) {
    const location = useLocation();
    var data = location.state;
    const navigate = useNavigate();

    const login = () => {
        if (data == null)
            data = { login: false }
        navigate("/login", { state: data });
    };

    return (
        <div class="root">

            <Layout data={data}  />
            <div class="container">
                <h1  > Eat sleep</h1>
                <h3>
                    Code repeat
                </h3>
            </div>
            <div class="row2">
                <a class="button" href="/signup">Sign up</a>
                <button class="button2" onClick={login}  >Login</button>
            </div>
        </div>
    );
}

export default Home;
