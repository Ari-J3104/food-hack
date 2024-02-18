var express = require('express');
var request = require('request');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var port = 8000;

require('dotenv').config();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));



// Path: backend/routes/api.js
// app.post('/api/uploadFile', upload.single('image'), function (req, res, next) {
// 	console.log('API works');
// 	console.log(req.file);
// 	console.log("req.body")
// 	console.log(req.body)
// });

app.post('/api/uploadScreenshot', function (req, res) {
	console.log('API works');
	request.post('http://127.0.0.1:5000/predict', {
		json: {
			image: req.body.image,
		},
	}, (error, response, body) => {
		if (error) {
			console.error('Error during API call:', error);
			res.status(500).send('Error during API call');
		} else {
			console.log('starting second post request');
			request.post({
				url: "https://trackapi.nutritionix.com/v2/natural/nutrients",

				headers: {
					'Content-Type': 'application/json',
					'x-app-id': process.env.NUTRITIONIX_APP_ID,
					'x-app-key': process.env.NUTRITIONIX_API_KEY,
				},
				body: JSON.stringify({
					query: body.prediction,
				}),
			}, function (error, response, body) {
				if (error) {
					console.error('Error during API call:', error);
					res.status(500).send('Error during API call');
				}

				console.log('API call done');
				console.log(body)
				res.status(200).send(body);
			})
		};
	});
	
});


app.listen(port, function() {
	console.log('Server started on port ' + port);
});

