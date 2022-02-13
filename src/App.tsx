import React from 'react';
import './App.css';
interface VideoProps { 
}
interface VideoState { 
}

class Video extends React.Component<VideoProps, VideoState> {

  videoRef = React.createRef<HTMLVideoElement>()
  canvasRef = React.createRef<HTMLCanvasElement>()

  componentDidMount() {
    var constraints = {video: { facingMode: "environment" }}
    let video = this.videoRef.current 
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function(mediaStream) {
        if (video) {
          video.srcObject = mediaStream;
          video.onloadedmetadata = function(e) {
            if (video) {
              video.play()
            }
          }
        }
      })
      .catch(function(err) {
        console.log(err.name + ": " + err.message);
      }); // always check for errors at the end.
      this.callback()
  }
  
  callback = () => {
    this.computeFrame();
    setTimeout(() => {
        this.callback();
      }, 0);
  }

  computeFrame = () => {
    let video = this.videoRef.current!
    let canvas = this.canvasRef.current!
    let ctx = canvas?.getContext('2d')!
    let width = video.videoHeight / 2
    let height = video.videoHeight / 2
    if (width === 0) {
      return 
    }
    ctx.drawImage(video, 0, 0, height, width)
    const frame = ctx.getImageData(0, 0, height, width)
    const length = frame.data.length
    const data = frame.data

    for (let i = 0; i < length; i += 4) {
      const red = data[i + 0];
      const green = data[i + 1];
      const blue = data[i + 2];
      let gray = (red + green + blue) / 3
      if (red < blue || red < green) { 
        data[i + 0] = gray;
      }
      data[i + 1] = gray;
      data[i + 2] = gray;
    }
    ctx.putImageData(frame, 0, 0);
  };

  render() {
    return (
      <div className="videoWrapper">
        <video autoPlay={true} ref={this.videoRef} playsInline={true} className="video"></video>
        <canvas ref={this.canvasRef} className="video"></canvas>
      </div>
    );
  }

}

function App() {
  return (
    <div>
      <Video/>
    </div>
  )
}

export default App;