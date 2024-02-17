var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var port = 8000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));



// Path: backend/routes/api.js
app.post('/api/upload', function (req, res) {
	console.log('API works');
});


app.listen(port, function() {
	console.log('Server started on port ' + port);
});

