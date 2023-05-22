import React from 'react';
import parse from 'html-react-parser';
import { useNavigate, useLocation } from "react-router-dom";

import Code from '../components/code';
import Layout from '../components/nav';
import "./codepage.css";

function CodeContest({ qs }) {
    const location = useLocation();
    var data = location.state;
    const navigate = useNavigate();
    const username = data.username;

    const value = parse(qs);
    return (
        <div class="root">
            <Layout data={data} />
            <div class="row">
                <div class="column"><p class="qs">{value}</p></div>
                <div class="column" >
                    <div class="code"> <Code /></div>
                </div>
            </div>
        </div>
    );
}

export default CodeContest;