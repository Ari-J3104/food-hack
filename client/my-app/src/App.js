// App.js

import React, { useEffect, useRef, useState, setState } from 'react';
import './App.css';

const CameraPreview = ({ onTakeScan, onFirstFoodChange }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);

const handleFirstFoodChange = (data) => {
		onFirstFoodChange(data);
	};
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
	onTakeScan(data);
	setLoading(false);
    fetch('/api/uploadScreenshot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: data }),
    })
      .then((res) => {
		res.json().then(data => {
			console.log(data)

			var firstFood = data.foods[0];
			handleFirstFoodChange(firstFood);
		})
      })
      .catch((error) => {
        console.error('Error during API call:', error);
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
      
      <button onClick={onReturnToLiveFeed}>Return to Live Feed</button>
    </div>
  );
};

const NutritionFacts = ({firstFood}) => {
  // Basic editable nutrition facts
  console.log("this is first food");
  console.log(firstFood)
  const [itemName, getItemName] = useState(null); 
  const [servingSize, setServingSize] = useState(null);
  const [calories, setCalories] = useState(null);
  const [totalFat, setTotalFat] = useState('g');
  const [cholesterol, setCholesterol] = useState('mg');
  const [protein, setProtein] = useState('g');
  const [sodium, setSodium] = useState('mg');
  const [carbs, setCarbs] = useState('g');
  const [sugars, setSugars] = useState('g');
  
	useEffect(() => {
		if (firstFood) {
			getItemName(firstFood.food_name);
			setServingSize(firstFood.serving_qty + " " + firstFood.serving_unit);
			setCalories(firstFood.nf_calories);
			setTotalFat(firstFood.nf_total_fat + " g");
			setCholesterol(firstFood.nf_cholesterol + " mg");
			setProtein(firstFood.nf_protein + " g");
			setSodium(firstFood.nf_sodium + " mg");
			setCarbs(firstFood.nf_total_carbohydrate + " g");
			setSugars(firstFood.nf_sugars + " g");
		}
	})


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
	const [firstFood, setFirstFood] = useState(null);

  const handleTakeScan = (data) => {
    setScan(data);
  };

  const handleReturnToLiveFeed = () => {
    setScan(null);
  };
	const onFirstFoodChange = (data) => {
		setFirstFood(data);
	};
  return (
    <div className="App">
      <header className="App-header">
        {/* Add the existing logo here */}
        <img id="logo-top" src="/foodi-logo.png" className="App-logo" alt="logo" />

        {scan ? (
          <ScanDisplay scan={scan} onReturnToLiveFeed={handleReturnToLiveFeed} />
        ) : (
          <CameraPreview onTakeScan={handleTakeScan} onFirstFoodChange={setFirstFood} />
		  
        )}
		<NutritionFacts firstFood={firstFood} />

        {/* Optional: Add other content */}
        <h1>By Wilson Huang and Aryan Jain</h1>
      </header>
    </div>
  );
}

export default App;
