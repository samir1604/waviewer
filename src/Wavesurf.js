import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import WaveSurfer from 'wavesurfer.js';

class Wavesurf extends Component {
    componentDidMount() {
        const { src } = this.props;
        const file = '/public/' + src;

        
        this.$el = ReactDOM.findDOMNode(this);
        this.$waveform = this.$el.querySelector('.wave');
        this.wavesurfer = WaveSurfer.create({
            container: this.$waveform,
            waveColor: 'violet',
            progressColor: 'purple'
        });



        this.wavesurfer.loadBlob(this.readFileAsBase64(file));
    }

    render() {
        return (
            <div className='waveform'>
                <div className='wave'></div>
            </div>
        )
    }

    readFileAsBase64(fileName) {
        let file = new Uint8Array(fileName);
        file.slice(2);
        let blob = new Blob([file]);
        return blob;
    }
}

export default Wavesurf;