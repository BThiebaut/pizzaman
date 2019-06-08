const db = require('./../db.js');
const config = require('./../../config.json');

exports.run = (req, res) => {
    let result = '';
    try {
        sendPizza(req.body.channel_id, req.body.user_id, req.body.user_name, req.body.text);
    } catch(e) {
        console.log(e);
        result = e;
    } finally {
        if (typeof(result) === 'object'){
            result = JSON.stringify(result);
        }
        res.status(200).send(result);
    }
};

function getTemplate(){
    let list = db.getAll();
    let result = "";
    
    if (Object.keys(list).length > 0){
        for (entry in list){
            let data = list[entry];
            result += "\n" + data.pizza + " " + data.dimension + "cm";
        }
    }else {
        throw "Liste vide !";
    }
    let template = config.template;
    result += "\n";
    template = template.replace('%pizzas%', result);
    return template;
}

function getMsgConfirm()
{
    let msg = "Le message suivant va être envoyé au " + config.phone + ":\n";
    msg += getTemplate();
    msg += "\n\nPour confirmer l'envois du message, renvoyez cette commande avec l'option \"!confirm\"";
    return msg;
}

function sendPizza(channel, user, name, text) {
    let regex = /(\S+)/g;
    if (!text){
        throw getMsgConfirm();
    }

    let matches = regex.exec(text);

    if (matches === null){
        throw "Je n'ai pas compris votre demande";
    }

    if (typeof matches[1] == 'undefined' || matches[1] !== "!confirm"){
        throw getMsgConfirm();
    }

    let template = getTemplate();
    throw 'TODO : envois de sms';
}