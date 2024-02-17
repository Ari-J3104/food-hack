var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var port = 8000;

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));



// Path: backend/routes/api.js
app.post('/api/upload', upload.single('image'), function (req, res, next) {
	console.log('API works');
	console.log(req.file);
	console.log("req.body")
	console.log(req.body)
});


app.listen(port, function() {
	console.log('Server started on port ' + port);
});

