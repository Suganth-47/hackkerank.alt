import { Link } from "react-router-dom";
import React, {   } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import "./nav.css";
import LoginImg from "../icons/enter.png"


const Layout = ({data}) => {

    const navigate = useNavigate();
    if(data==null){
        data={username:"Login here"};
    }

    const loginf = () => {
        if (data == null)
            data = { login: false }
        navigate("/login", { state: data });
    };

    const contestf = () => {
        navigate("/contest",{state:data});
    }

    const codef = () => {
        navigate("/code",{state:data});
    }

    const homef = () => {
        navigate("/",{state:data});
    }


    return (
        <nav>
            <div class="navbar">
                <ul>
                    <li>
                        <button class="navitem" onClick={homef}>Home</button>
                    </li>
                    <li>
                        <button class="navbaritem" onClick={codef}>Code</button>
                    </li>
                    <li>
                        <button class="navbaritem" onClick={contestf}>Contest</button>
                    </li>
                    <div class="navright">
                        <li class="navitem">{data.username}</li>
                        <li style={{ paddingTop: 5 }}><button class="log_btn navitem" onClick={loginf}><img src={LoginImg} alt="img" /></button></li>
                    </div>
                </ul>
            </div>

        </nav>
    )
};

export default Layout;
