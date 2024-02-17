import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

const CameraPreview = () => {
	const videoRef = useRef(null);
	const canvasRef = useRef(null);

	const takeScreenshot = () => {
		const canvas = canvasRef.current;
		const video = videoRef.current;
		if (canvas && video) {
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
		}
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
			<canvas ref={canvasRef} />
		</div>
	);
};

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<CameraPreview />
			</header>
		</div>
	);
}

export default App;
