import React, { Component } from 'react';
import './App.css';

import videojs from 'video.js';
const videojsOptions = {
  autoplay: true,
  controls: false,
  preload: 'auto',
  muted: true,
};

class App extends Component {
  player: videojs.Player | null;
  videoNode: HTMLVideoElement | null;
  canvas: HTMLCanvasElement | null;

  constructor(props: any) {
    super(props);
    this.player = null;
    this.videoNode = null;
    this.canvas = null;
  }

  componentDidMount() {
    this.player = videojs(this.videoNode, videojsOptions, () => {
      console.log('onPlayerReady');

      if (this.player) {
        console.log('player is available adding track listener');

        this.player.textTracks().on('addtrack', (evt) => {
          console.log('addtrack cb:', evt);
        });
      } else {
        console.log('no player is available');
      }


      setInterval(() => {
        if (this.canvas && this.player) {
          const realVideoElement = this.player.el().querySelector('video');
          const ctx = this.canvas.getContext('2d');

          if (!ctx || !realVideoElement) {
            console.log('missing ctx or realVideoElement');
            return;
          }

          if (this.canvas.width !== this.player.videoWidth()) {
            this.canvas.width = this.player.videoWidth();
          }

          if (this.canvas.height !== this.player.videoHeight()) {
            this.canvas.height = this.player.videoHeight();
          }

          const {width, height} = this.canvas;
          ctx.drawImage(realVideoElement, 0, 0, width, height);

          ctx.font = '40px sans-serif';
          ctx.fillStyle = 'red';
          ctx.fillText(`${this.player.currentTime()} seconds out of ${this.player.bufferedEnd()}`, 20, 2*height/3);
        }

      }, 33);
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>
        <div data-vjs-player>
          <video ref={ node => this.videoNode = node } className="video-js">
            <source src="./assets/index.m3u8" type="application/x-mpegURL" />
            { /*<source src="./assets/test.webm" type="video/webm" /> */ }
            Nothing to see here
          </video>
        </div>
        <canvas ref={ node => this.canvas = node } className="overlay" />
      </div>
    )
  }
}

export default App;
