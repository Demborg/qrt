import React from 'react';
import './App.css';
import art from './qrcode.png'
interface VideoProps { 
}
interface VideoState { 
}

class Video extends React.Component<VideoProps, VideoState> {

  videoRef = React.createRef<HTMLVideoElement>()
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
  }

  render() {
    return (
      <div className="videoWrapper">
        <video autoPlay={true} ref={this.videoRef} playsInline={true} className="video"></video>
        <img src={art} alt="" className="art"/>
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