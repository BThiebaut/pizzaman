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

function addPizza(channel, user, name, text) {
    let regex = /(\S+) (\d+)/g;
    if (!text){
        throw 'Usage : <NomPizza> <dimension>';
    }
    let matches = regex.exec(text);

    if (matches === null){
        throw "Je n'ai pas compris votre demande";
    }

    if (typeof matches[1] == 'undefined'){
        throw "Erreur : Nom de la pizza non reconnu";
    }
    if (typeof matches[2] == 'undefined'){
        throw "Erreur : Taille de la pizza non reconnu";
    }
    var pizza = matches[1];
    var taille = matches[2];

    let msg = db.add(user, name, pizza, taille);

    throw msg;
}