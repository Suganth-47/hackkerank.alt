import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import "./contest.css";
import CodeContest from './codecontest';
import Loading from '../components/loading';

function Contest() {
    const location = useLocation();
    var data = location.state;
    const navigate = useNavigate();

    const [InContest, SetInContest] = useState(false);
    const [qs, Setqs] = useState("");
    const [IsLoading,SetLoading] = useState(false);

    const Owner = data.ContestInfo.Owner;
    const ContestName = data.ContestInfo.ContestName;
    const ContestDesc = data.ContestInfo.ContestDesc;

    let hidden = null;
    let visibilityChange = null;
    if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support 
        hidden = 'hidden';
        visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden';
        visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden';
        visibilityChange = 'webkitvisibilitychange';
    }


    const handleVisibilityChange = () => {
        if (InContest&&document[hidden]) {
            alert("Tab switched");
        }
    }
    document.addEventListener(visibilityChange, handleVisibilityChange, false);

    const enroll = async () => {
        SetInContest(true);
        SetLoading(true);
        var link = `http://localhost:3001/getqs?ContestName=${ContestName}`;
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
        SetLoading(false);
        Setqs(result.qs.qs);
    };
    const back = () => {
        navigate('/contest', { state: data });
    };

    return (
        <div class="root">
            {!InContest &&
                <div class="container-contest">
                    <button class="close-btn" onClick={back}>&#10006;</button>
                    <b class="conname">{ContestName}</b>
                    <br />
                    <b class="conowner">conducted by {Owner}</b>
                    <br />
                    <b class="condesc">{ContestDesc}</b>
                    <br />
                    <button class="enroll-btn" onClick={enroll}>Join</button>
                </div>}
            {InContest &&
                <div class="contest" >
                    {IsLoading && <Loading/>}
                    <CodeContest qs={qs} />
                </div>
            }
        </div>
    );
}

export default Contest;
