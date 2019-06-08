const express = require('express');
const bodyParser = require('body-parser');
const router = require('./app/router.js');
const config = require('./config.json');
const slack = require('./app/slack.js');
const { RTMClient } = require('@slack/rtm-api');
const rtm = new RTMClient(config.token);

(async () => {
  // Connect to Slack
  const { self, team } = await rtm.start();
  slack.init(rtm);
  slack.registerEvents();
})();

let httpApi = express();
httpApi.use(bodyParser.json());
httpApi.use(bodyParser.urlencoded({extended: true}));

router.getAvailiableCommand(commands => {
  if (commands.length > 0){
    commands.forEach(command => {
      httpApi.post('/' + command, function(req, res){
        router.callCommand(command, req, res);
      });  
    });
  }
});

httpApi.listen(8080);

