import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Layout from '../components/nav';

import "./contestlistitem.css";

function Contest({Owner,ContestName,ContestDesc}) {

    const location = useLocation();
    var data = location.state;
    const navigate = useNavigate();

    const contest_page = () => { 
        data.ContestInfo={Owner:Owner,ContestName:ContestName,ContestDesc:ContestDesc};
        navigate("/contestinfo", { state: data });
    };

    console.log(ContestName);

    return (
        <div class="listitem" onClick={contest_page}>
            <h2>{ContestName}</h2>
        </div>
    );
}

export default Contest;