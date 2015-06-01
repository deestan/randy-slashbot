var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function(req, res) {
  if (!req.body.text)
    return res.status(400).send("Yeh?");
  var args = req.body.text.split(" ");
  res.send("You: " + JSON.stringify(args));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
