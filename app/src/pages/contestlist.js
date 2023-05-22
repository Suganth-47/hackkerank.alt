import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Layout from '../components/nav';
import ContestListItem from '../components/contestlistitem';
import { useEffect, useState } from 'react';
import Loading from '../components/loading';

import "./contestlist.css";

function Contest() {

    const location = useLocation();
    var data = location.state;
    const navigate = useNavigate();

    const enroll = () => { };


    //temp
    const [list, SetList] = useState([]);
    const [isLoading,SetLoading] = useState(true);

    useEffect(() => {
        async function fetchMyAPI() {
            var link = `http://localhost:3001/getcontests`;
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
            console.log(result.output);
            SetLoading(false);
            SetList(result.output);
            //            SetList(response);
        }

        fetchMyAPI()
    });


    return (
        <div class="root-contest">
            {isLoading&&<Loading/>}
            <Layout data={data} />
            <div class="container4">
                {list.map((it) => {
                    return (
                        <ContestListItem Owner={it.Owner} ContestDesc={it.ContestDesc} ContestName={it.ContestName} />
                    );
                })}
            </div>
        </div>
    );
}

export default Contest;