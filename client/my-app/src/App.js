// App.js

import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const CameraPreview = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const takeScreenshot = () => {
    setLoading(true); // Set loading state to true
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    }
    // Simulate asynchronous task (e.g., API call) with setTimeout
    setTimeout(() => {
      setLoading(false); // Set loading state to false after the task is done
    }, 1000);
  };

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error(err));
    }
  }, []);

  return (
    <div>
      <h2>Video feed:</h2>
      <video ref={videoRef} autoPlay />
      <button onClick={takeScreenshot}>Take Screenshot</button>
      {loading && <img src="/loading.png" alt="loading" className="loading-image" />}
      <canvas ref={canvasRef} />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Add the existing logo here */}
        <img src="/foodi-logo.png" className="App-logo" alt="logo" />

        {/* Add the CameraPreview component */}
        <CameraPreview />

        {/* Optional: Add other content */}
        <h1>Your Website Title</h1>
      </header>
    </div>
  );
}

export default App;
