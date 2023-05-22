import React from 'react';
import Editor from '@monaco-editor/react';
import { useState } from 'react';

import "./code.css";

function Code(props) {

    var editor = "print('Hello world')";
    const [isLoading, setIsLoading] = useState(false);
    const [output, setOutput] = useState('');

    const compile = async () => {
        console.log(editor);
        setIsLoading(true);

        try {
            var link = `http://localhost:3001/compile`;
            console.log(link);
            const response = await fetch(link, {
                method: 'POST',
                body: JSON.stringify({
                    code:editor, 
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = await response.json();
            if (result["run"]) {
                setOutput(result['output']);
            }
            else {
                setOutput(result['There was an error while compiling']);
            }

            console.log('result is: ', JSON.stringify(result, null, 4));

        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div class="code-container">
            <Editor onChange={e => { editor = e; }} theme="vs-dark" height="70vh" language="python" value="print('Hello, World!')" />
            <button class="compile_btn" onClick={compile}>Compile</button>
            {output != null && <p class="output">{output}</p>}
        </div>
    );
}

export default Code;
