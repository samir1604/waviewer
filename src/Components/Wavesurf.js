import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Button, Spinner, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlay,
	faPause,
	faStop,
	faClock,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import WaveSurfer from 'wavesurfer.js';

const KB = 1024;

class Wavesurf extends Component {
	constructor(props) {
		super(props);

		this.state = {
			duration: 0,
		};

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
		if (currentProgress >= 0) {
			this.wavesurfer.empty();
			this.wavesurfer.drawBuffer();
			this.wavesurfer.seekTo(currentProgress);
		}
	}

	hideLoading($el) {
		const loading = $el.querySelector('.loading');
		loading.remove();
	}

	componentDidMount() {
		const { src } = this.props;
		this.$el = ReactDOM.findDOMNode(this);
		this.$waveform = this.$el.querySelector('.wave');

		this.wavesurfer = WaveSurfer.create({
			container: this.$waveform,
			waveColor: '#e77fe7',
			progressColor: '#7d017d',
		});

		this.wavesurfer.on('ready', () => {
			this.setState({ duration: this.wavesurfer.getDuration() });
			this.hideLoading(this.$el);
			this.$waveform.style = {
				display: 'grid',
			};
			this.wavesurfer.drawBuffer();
		});

		this.wavesurfer.load(src);
		window.addEventListener('resize', this.handleResize.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	render() {
		const { meta } = this.props;
		const { name, size, created } = meta;
		const { duration } = this.state;

		return (
			<div className="article-container">
				<Row>
					<Col className="waveform">
						<div className="loading">
							<Spinner animation="grow" variant="danger" />
						</div>
						<div className="wave" style={{ display: 'none' }} />
					</Col>
				</Row>
				<Row>
					<Col>
						<div className="buttonPanel">
							<Button variant="success" onClick={this.playWave}>
								<FontAwesomeIcon icon={faPlay} /> Play
							</Button>
							<Button variant="warning" onClick={this.pauseWave}>
								<FontAwesomeIcon icon={faPause} /> Pause
							</Button>
							<Button variant="danger" onClick={this.stopWave}>
								<FontAwesomeIcon icon={faStop} /> Stop
							</Button>
							<div className="meta-info">
								<div>
									<h5>
										<Badge variant="secondary">
											{name} | {`${Math.round(size / KB)} Kb`} |{' '}
											{moment(created).format('MM/DD/YYYY')}
										</Badge>
									</h5>
								</div>
								<div>
									<h5>
										<Badge variant="info">
											<FontAwesomeIcon icon={faClock} /> {`${duration}s`}
										</Badge>
									</h5>
								</div>
							</div>
						</div>
					</Col>
				</Row>
				<hr />
			</div>
		);
	}
}

export default Wavesurf;
