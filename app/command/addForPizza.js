const db = require('./../db.js');

exports.run = (req, res) => {
    let result = '';
    try {
        addPizza(req.body.channel_id, req.body.user_id, req.body.user_name, req.body.text);
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

function addPizza(channel, user, name, text) {
    let regex = /(\S+) (\S+) (\d+)/g;
    if (!text){
        throw 'Usage : <utilisateur> <NomPizza> <dimension>';
    }
    let matches = regex.exec(text);

    if (matches === null){
        throw "Je n'ai pas compris votre demande";
    }

    if (typeof matches[1] == 'undefined'){
        throw "Erreur : Utilisateur externe non reconnu";
    }
    if (typeof matches[2] == 'undefined'){
        throw "Erreur : Nom de la pizza non reconnu";
    }
    if (typeof matches[3] == 'undefined'){
        throw "Erreur : Taille de la pizza non reconnu";
    }

    var user = genUser();
    var name = matches[1];
    var pizza = matches[2];
    var taille = matches[3];

    let msg = db.add(user, name, pizza, taille);

    throw name + " : " + msg;
}