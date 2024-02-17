// App.js

import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const CameraPreview = ({ onTakeScreenshot }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const takeScreenshot = () => {
    setLoading(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    }

    const data = canvas.toDataURL('image/png');
    fetch('/api/uploadScreenshot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: data }),
    });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

	useEffect(() => {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({
				video: { facingMode: 'environment' } // Use the back camera
			})
				.then(stream => {
					if (videoRef.current) {
						videoRef.current.srcObject = stream;
					}
				})
				.catch(err => alert('Please enable camera access'));
		}
	}, []);

  return (
    <div>
      <h2>Video feed:</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ maxWidth: '100%', width: '100%' }}
      />
      <button onClick={takeScreenshot}>Take Screenshot</button>
      {loading && <img src="/loading.png" alt="loading" className="loading-image" />}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

const ScreenshotDisplay = ({ screenshot, onReturnToScan }) => {
  return (
    <div>
      <h2>Screenshot:</h2>
      <img src={screenshot} alt="screenshot" />
      <p>Random text goes here.</p>
      <button onClick={onReturnToScan}>Return to Scan</button>
    </div>
  );
};

const UploadImage = () => {
  return (
    <div>
      <h2>Upload Image:</h2>
      <form action="" method="post" encType="multipart/form-data">
        <input type="file" name="image" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

function App() {
  const [screenshot, setScreenshot] = useState(null);

  const handleTakeScreenshot = () => {
    const canvas = document.createElement('canvas');
    const video = document.querySelector('video');

    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      const dataURL = canvas.toDataURL('image/png');
      setScreenshot(dataURL);
    }
  };

  const handleReturnToScan = () => {
    setScreenshot(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Add the existing logo here */}
        <img id="logo-top" src="/foodi-logo.png" className="App-logo" alt="logo" />

        {screenshot ? (
          <ScreenshotDisplay screenshot={screenshot} onReturnToScan={handleReturnToScan} />
        ) : (
          <CameraPreview onTakeScreenshot={handleTakeScreenshot} />
        )}

        {/* Optional: Add other content */}
        <h1>Your Website Title</h1>
        <UploadImage />
      </header>
    </div>
  );
}

export default App;
