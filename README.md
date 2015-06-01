# randy-slashbot

Slack Slash Command server for providing randomness.  Powered by randy.

Based off https://github.com/heroku/node-js-getting-started

## Deploying to Heroku

This server needs a webhook to post results to.  This must be given as an environment variable in heroku:

```
$ heroku config:set WEBHOOK=https://hooks.slack.com/services/blah/blah/blah
```
