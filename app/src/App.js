import './App.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { useState, } from 'react';
import Home from './pages/home.js';
import CodePage from './pages/codepage.js';
import Login from './components/login';
import Register from './components/register';
import Contest from './pages/contest';
import ContestList from './pages/contestlist';

function App() {
	const [username, setusername] = useState("Login here");
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home username={username} />} />
				<Route path="/code" element={<CodePage username={username} />} />
				<Route path="/login" element={<Login setusername={setusername} />} />
				<Route path="/signup" element={<Register setusername={setusername} />} />
				<Route path="/contestinfo" element={<Contest />} />
				<Route path="/contest" element={<ContestList/>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
