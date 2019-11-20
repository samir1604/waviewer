import React from 'react';
import logo from './logo.svg';
import './App.css';
import Wavesurf from './Wavesurf';

function App() {
  console.log('public url: ', process.env.PUBLIC_URL);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Wavesurf src={process.env.PUBLIC_URL + 'Aisha.mp3'} />
      </header>
    </div>
  );
}

export default App;
