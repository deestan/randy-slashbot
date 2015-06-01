var express = require('express');
var bodyParser = require('body-parser');
var randyCommands = require('./randy-commands');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function(req, res) {
  if (!req.body.text)
    return res.status(400).send("Yeh?");

  var text = req.body.text;
  // shortcut to d6 etc...
  if (/^d\d/.test(text))
    test.replace(/d/, "d ");

  var args = text.split(" ");
  var func = args.shift();
  if (!randyCommands[func])
    return res.status(400).send("Valid commands: " + Object.keys(randyCommands).join(", "));
  try {
    var result = randyCommands[func](args);
    res.status(200).send(result.toString());
  } catch(e) {
    res.status(500).send(e.message || "I'm confused.");
  }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
