const db = require('./../db.js');

exports.run = (req, res) => {
    let result = '';
    try {
        myPizza(req.body.channel_id, req.body.user_id, req.body.user_name);
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

function myPizza(channel, user, name) {
    
    let entry = db.getByUser(user);
    if (entry === null){
        throw "Vous n'avez aucune pizza enregistrée !";
    }

    throw "Commande enregistrée : " + entry.pizza + " " + entry.dimension + " cm.";
}