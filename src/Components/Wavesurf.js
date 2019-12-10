import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import WaveSurfer from 'wavesurfer.js';

class Wavesurf extends Component {
	constructor(props) {
		super(props);
		this.playWave = this.playWave.bind(this);
		this.pauseWave = this.pauseWave.bind(this);
		this.stopWave = this.stopWave.bind(this);
	}

	playWave() {
		this.wavesurfer.play();
	}

	pauseWave() {
		this.wavesurfer.pause();
	}

	stopWave() {
		this.wavesurfer.stop();
	}

	handleResize() {
		const currentProgress =
			this.wavesurfer.getCurrentTime() / this.wavesurfer.getDuration();
		this.wavesurfer.empty();
		this.wavesurfer.drawBuffer();
		this.wavesurfer.seekTo(currentProgress);
	}

	hideLoading($el) {
		const loading = $el.querySelector('.loading');
		loading.remove();
	}

	componentDidMount() {
		const { src } = this.props;
		this.$el = ReactDOM.findDOMNode(this);
		this.$waveform = this.$el.querySelector('.wave');

		//this.showLoad(this.$waveform, true);

		this.wavesurfer = WaveSurfer.create({
			container: this.$waveform,
			waveColor: 'blue',
			progressColor: 'yellow',
		});

		this.wavesurfer.on('ready', () => {
			this.hideLoading(this.$el);
			this.$waveform.style = {
				display: 'grid',
			};
			this.wavesurfer.drawBuffer();
		});

		this.wavesurfer.load(src);

		//window.addEventListener('resize', this.handleResize.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	render() {
		const { meta } = this.props;
		return (
			<div>
				<div className="waveform">
					<div className="loading">
						<img
							width="52"
							height="52"
							src="img/loading-86.gif"
							alt="cargando"
						/>
					</div>
					<div className="wave" style={{ display: 'none' }} />
					<div className="buttons">
						<button onClick={this.playWave}>Play</button>
						<button onClick={this.pauseWave}>Pause</button>
						<button onClick={this.stopWave}>Stop</button>
					</div>
					<div className="meta">
						{meta.name}, {meta.size}, {meta.created}
					</div>
				</div>
			</div>
		);
	}
}

export default Wavesurf;
