import React from 'react';
import './App.css';
import { Container, Row, Col, Navbar } from 'react-bootstrap';

/* COMPONENTS */
import Audios from './Components/Audios';

function App() {
	return (
		<Container>
			<Navbar bg="light">
				<Navbar.Brand>
					<img
						alt="logo"
						src="frecuencia-de-sonido.svg"
						width="30"
						height="30"
						className="d-inline-block align-top"
					/>{' '}
					Audio Analizer
				</Navbar.Brand>
			</Navbar>
			<Row>
				<Col>
					<Audios />
				</Col>
			</Row>
		</Container>
	);
}

export default App;
