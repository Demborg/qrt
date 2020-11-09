import React from 'react';
import './App.css';

interface VideoProps { 
}
interface VideoState { 
}

class Video extends React.Component<VideoProps, VideoState> {

  videoRef = React.createRef<HTMLVideoElement>()
  constructor(props: VideoProps) {
    super(props)
  }

  componentDidMount() {
    var constraints = {video: true}
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
      <div>
        <video autoPlay={true} ref={this.videoRef}></video>
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