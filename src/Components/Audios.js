import React, { Component } from 'react';
import Wavesurf from './Wavesurf';

class Audios extends Component {
	state = {
		audios: [],
		error: {},
	};

	async fetchData() {
		const result = await fetch('http://localhost:5000/1');
		result
			.json()
			.then(data => this.setState({ audios: data }))
			.catch(err => console.log(err));
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
		const { audios } = this.state;

		return (
			<main>
				{audios.map(item => (
					<article className="article" key={item.name}>
						<Wavesurf
							meta={item}
							src={'http://localhost:5000/audio/' + item.name}
						/>
					</article>
				))}
			</main>
		);
	}
}

export default Audios;
