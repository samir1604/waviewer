import React from 'react';
import './App.css';

/* COMPONENTS */
import Audios from './Components/Audios';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>Audio Analizer</h1>
			</header>
			<div className="container">
				<Audios />
			</div>
		</div>
	);
}

export default App;
