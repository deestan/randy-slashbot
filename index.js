var express = require('express');
var bodyParser = require('body-parser');
var randyCommands = require('./randy-commands');
var request = require('request');
var fs = require('fs');
var app = express();

var hookUrl = process.env.WEBHOOK;

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function(req, res) {
  var usage = "Valid commands: " + Object.keys(randyCommands).join(", ");

  if (!req.body.text)
    return res.status(400).send(usage);

  var user = req.body.user_name || "<hax0r>";
  var text = req.body.text;
  var channelId = req.body.channel_id;

  // shortcut to d6 etc...
  if (/^d\d/.test(text))
    text = text.replace(/d/, "d ");

  function postChat(message, callback) {
    request.post(
      hookUrl, { body: JSON.stringify({
        text: message,
        icon_emoji: ":game_die:",
        channel: channelId
      }) }, callback);
  }

  var replied = false;
  function reply(status, message) {
    if (replied) return;
    replied = true;
    res.status(status).send(message);
  }

  var args = text.split(" ");
  var func = args.shift();
  if (!randyCommands[func])
    return reply(400, usage);
  try {
    postChat("> " + user + ": " + req.body.text, function(err) {
      if (err) return reply(500, "Cannot post to chat: " + err);
    });
    randyCommands[func](args, function(err, result) {
      if (err)
        return res.status(500).send(err);
      postChat(result, function(err) {
        if (err) return reply(500, "Cannot post to chat: " + err);
        reply(200, "");
      });
    });
  } catch(e) {
    reply(500, e.message || "I'm confused.");
  }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
