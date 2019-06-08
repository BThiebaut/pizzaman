const db = require('./../db.js');

exports.run = (req, res) => {
    let result = '';
    try {
        listPizza(req.body.channel_id, req.body.user_id, req.body.user_name);
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

function listPizza(channel, user, name) {
    let list = db.getAll();
    let result = "";

    if (Object.keys(list).length > 0){
        for (entry in list){
            let data = list[entry];
            result += "\n" + data.name + " : " + data.pizza + " " + data.dimension + " cm.";
        }
    }else {
        throw "Liste vide !";
    }

    throw "Liste des pizzas enregistrées aujourd'hui : " + result + "";
}