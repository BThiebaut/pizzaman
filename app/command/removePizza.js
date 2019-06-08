const db = require('./../db.js');

exports.run = (req, res) => {
    let result = '';
    try {
        removePizza(req.body.channel_id, req.body.user_id, req.body.user_name);
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

function removePizza(channel, user, name) {
    let msg = db.remove(user, name);
    throw msg;
}