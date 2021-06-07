var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.json(
    {
      "name": req.file.originalname,
      "size": req.file.size,
      "type": req.file.mimetype
    }
  )
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
