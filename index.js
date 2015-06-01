var express = require('express');
var bodyParser = require('body-parser');
var randyCommands = require('./randy-commands');
var request = require('request');
var fs = require('fs');
var app = express();

var hookUrl = process.env.WEBHOOK;

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function(req, res) {
  var usage = "Valid commands: " + Object.keys(randyCommands).join(", ");

  if (!req.body.text)
    return res.status(400).send(usage);

  var user = req.body.user_name || "<hax0r>";
  var text = req.body.text;
  // shortcut to d6 etc...
  if (/^d\d/.test(text))
    text = text.replace(/d/, "d ");

  var args = text.split(" ");
  var func = args.shift();
  if (!randyCommands[func])
    return res.status(400).send(usage);
  try {
    var result = randyCommands[func](args);
    var chatMessage = user + ": " + req.body.text + '\n> ' + result;
    request.post(hookUrl, { form: JSON.stringify({ text: chatMessage }) }, function(err, resp, body) {
      if (err)
        return res.status(500).send(err);
      res.status(200).end();
    });
  } catch(e) {
    res.status(500).send(e.message || "I'm confused.");
  }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
