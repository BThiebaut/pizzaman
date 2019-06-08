const db = require('./../db.js');

exports.run = (req, res) => {
    let result = '';
    try {
        removeForPizza(req.body.channel_id, req.body.user_id, req.body.user_name, req.body.text);
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

function genUser() {
    return 'ext-'+ 'xxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

function removeForPizza(channel, user, name, text) {
    let regex = /(\S+)/g;
    if (!text){
        throw 'Usage : <utilisateur>';
    }
    let matches = regex.exec(text);

    if (matches === null){
        throw "Je n'ai pas compris votre demande";
    }

    if (typeof matches[1] == 'undefined'){
        throw "Erreur : Utilisateur externe non reconnu";
    }
    
    var name = matches[1];
    let userExt = db.getUserByName(name);
    if (userExt === null){
        throw 'Erreur : aucun utilisateur correspondant au nom de ' + name;
    }

    if (userExt.indexOf('ext-') < 0){
        throw "Impossible de retirer la commande d'un autre utilisateur non externe !";
    }

    let msg = db.remove(userExt, name);
    throw name + " : " + msg;
}