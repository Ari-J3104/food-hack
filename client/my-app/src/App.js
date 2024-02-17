// App.js

import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const CameraPreview = ({ onTakeScan }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const takeScan = () => {
    setLoading(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    }

    const data = canvas.toDataURL('image/png');
    fetch('/api/uploadScan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: data }),
    })
      .then(() => {
        setLoading(false);
        onTakeScan(data);
      })
      .catch((error) => {
        console.error('Error during API call:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: 'environment' }, // Use the back camera
        })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => alert('Please enable camera access'));
    }
  }, []);

  return (
    <div className="text-center">
      <h2>Video feed:</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ maxWidth: '100%', width: '100%' }}
      />
      <button onClick={takeScan}>Take Scan</button>
      {loading && <img src="/loading.png" alt="loading" className="loading-image" />}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

const ScanDisplay = ({ scan, onReturnToLiveFeed }) => {
  return (
    <div className="text-center">
      <h2>Scan:</h2>
      <img src={scan} alt="scan" style={{ maxWidth: '100%' }} />
      <NutritionFacts />
      <button onClick={onReturnToLiveFeed}>Return to Live Feed</button>
    </div>
  );
};

const NutritionFacts = () => {
  // Basic editable nutrition facts
  const [itemName, getItemName] = useState(null); 
  const [servingSize, setServingSize] = useState(null);
  const [calories, setCalories] = useState(null);
  const [totalFat, setTotalFat] = useState('g');
  const [cholesterol, setCholesterol] = useState('mg');
  const [protein, setProtein] = useState('g');
  const [sodium, setSodium] = useState('mg');
  const [carbs, setCarbs] = useState('g');
  const [sugars, setSugars] = useState('g');
  const [caffeine, setCaffeine] = useState('mg');


  return (
    <div>
	  <h2>Item: {itemName}</h2>
      <h3>Nutrition Facts</h3>
      <p>Serving Size: {servingSize}</p>
      <p>Calories: {calories}</p>
      <p>Total Fat: {totalFat}</p>
      <p>Cholesterol: {cholesterol}</p>
	  <p>Protein: {protein}</p>
	  <p>Sodium: {sodium}</p>
	  <p>Total Carbohydrates: {carbs}</p>
	  <p>Sugars: {sugars}</p>
	  <p>Caffeine: {caffeine}</p>
      {/* Add more nutrition facts as needed */}
    </div>
  );
};

const UploadImage = () => {
  return (
    <div className="text-center">
      <h2>Upload Image:</h2>
      <form action="" method="post" encType="multipart/form-data">
        <input type="file" name="image" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

function App() {
  const [scan, setScan] = useState(null);

  const handleTakeScan = (data) => {
    setScan(data);
  };

  const handleReturnToLiveFeed = () => {
    setScan(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Add the existing logo here */}
        <img id="logo-top" src="/foodi-logo.png" className="App-logo" alt="logo" />

        {scan ? (
          <ScanDisplay scan={scan} onReturnToLiveFeed={handleReturnToLiveFeed} />
        ) : (
          <CameraPreview onTakeScan={handleTakeScan} />
        )}

        {/* Optional: Add other content */}
        <h1>By Wilson Huang and Aryan Jain</h1>
        <UploadImage />
      </header>
    </div>
  );
}

export default App;
