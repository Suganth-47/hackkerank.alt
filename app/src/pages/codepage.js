import React from 'react';
import parse from 'html-react-parser';
import { useNavigate, useLocation } from "react-router-dom";

import Code from '../components/code';
import Layout from '../components/nav';
import "./codepage.css";

function CodePage() {
    const location = useLocation();
    var data = location.state;
    const navigate = useNavigate();
    const username = data.username;

    const qs = `Write a program that accepts a char, int and float as input and prints the same.
<b>
Input Format
</b>
    The input consists of a char, int and float separated by a space.
<b>
Constraints
</b>
    print the floating number *two decimal
<b>
Output Format
</b>
    The output prints the char, int and float values separated by a space.
    
Round off the float value to two decimal places.`;
const value = parse(qs);
    return (
        <div class="root">
            <Layout data={data}/>
            <div class="row">
                <div class="column"><p class="qs">{value}</p></div>
                <div class="column" >
                   <div class="code"> <Code /></div>
                    </div>
            </div>
        </div>
    );
}

export default CodePage;