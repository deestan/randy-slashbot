var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function(req, res) {
  res.send('Hello World! ' + JSON.stringify(req.body));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
