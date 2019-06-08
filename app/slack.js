var slackRtm = null;

exports.init = rtm => {
    slackRtm = rtm;
};

exports.sendMessage = message => {
    return slackRtm.sendMessage(message);
}

exports.registerEvents = function(){
    slackRtm.on('app_mention', event => {
        console.log(event);
    });
};