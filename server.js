var express = require('express')
var multer  = require('multer')
var fs = require('fs');

var app = express()
var upload = multer({ dest: './uploads/' })

app.set('port', (process.env.PORT || 5000))
app.enable('trust proxy')

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', function(req, res) {
    res.render('index')
})

app.post('/file', upload.single('file'), function (req, res, next) {
    res.send({size: req.file.size})
    fs.unlink(req.file.path)
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'))
})