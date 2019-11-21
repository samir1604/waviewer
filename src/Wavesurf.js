import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import WaveSurfer from 'wavesurfer.js';

class Wavesurf extends Component {
    
    componentDidMount() {
        const { src } = this.props;

        this.$el = ReactDOM.findDOMNode(this);
        this.$waveform = this.$el.querySelector('.wave');
        this.wavesurfer = WaveSurfer.create({
            container: this.$waveform,
            waveColor: 'violet',
            progressColor: 'purple'
        });

        this.wavesurfer.load(src);

        //this.wavesurfer.loadBlob(this.readFileAsBase64(src));
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
        console.log(file);
        file.slice(2);
        let blob = new Blob([file]);
        return blob;
    }
}

export default Wavesurf;