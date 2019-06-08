const fs = require('fs');
const tempDir = "./temp";

var msgCache = "";

function getFileName(){
    let now = new Date();
    let day = now.getDate();
    let month = now.getMonth()+1; 
    let year = now.getFullYear();
    return tempDir + '/' + day + '-' + month + '-' + year + '.json';
}

exports.init = () => {
    let fileName = getFileName();
    let initContent = {};

    try {
        if (!fs.existsSync(fileName)) {
            console.log('Init : Création de  ' + fileName + '.')
            let data = JSON.stringify(initContent);
            fs.writeFileSync(fileName, data);  
        }else {
            console.log('Init : le fichier ' + fileName + ' existe déjà.')
        }
    } catch(err) {
        console.error(err)
        throw err;
    }
};

exports.getAll = () => {
    try {
        exports.init();
        let fileName = getFileName();
        let rawdata = fs.readFileSync(fileName);
        return JSON.parse(rawdata);
    } catch(err) {
        console.error(err)
        throw 'Erreur : Impossible de récupérer le contenus du fichier de sauvegarde : ' + err;
    }
};

exports.getByUser = (user, name) => {
    try {
        exports.init();
        let db = exports.getAll();
        return typeof db[user] !== typeof void(0) ? db[user] : null;
    } catch (e) {
        throw 'Impossible de récupérer les commandes pour le nom ' + name + '. : ' + e;
    } 
};

exports.getUserByName = (name) => {
    try {
        exports.init();
        let db = exports.getAll();
        let user = null;
        if (Object.keys(db).length > 0){
            for(entry in db){
                var data = db[entry];
                if (data.name.toLowerCase() == name.toLowerCase()){
                    user = entry;
                }
            }
        }
        return user;
    } catch (e) {
        throw 'Impossible de récupérer l\'utilisateur pour le nom ' + name + '. : ' + e;
    } 
};

exports.write = content => {
    exports.init();
    try {
        let fileName = getFileName();
        let data = JSON.stringify(content);
        fs.writeFileSync(fileName, data);  
    } catch (err) {
        throw "Erreur : impossible d'écrire la commande : " + err;
    }
};

exports.add = (user, name, pizza, dim) => {
    exports.init();
    let db = exports.getAll();
    let actual = exports.getByUser(user);

    if (actual !== null) {
        msgCache += "\nVous avez déjà enregistré une pizza aujourd'hui : " + actual.pizza + " " + actual.dimension + " cm. Elle va être remplacée !";
    }

    db[user] = {
        'name' : name,
        'pizza' : pizza,
        'dimension' : dim,
    };

    exports.write(db);
    msgCache += "\nPizza ajoutée : " + pizza + " " + dim + " cm !";
    return msgCache;
};

exports.remove = (user, name) => {
    exports.init();
    let db = exports.getAll();
    let actual = exports.getByUser(user);
    if (actual === null){
        throw "Pas de pizza enregistrée pour l'utilisateur : " + name;
    }

    delete db[user];
    exports.write(db);
    return "La pizza " + actual.pizza + " " + actual.dimension + " a bien été retirée !";
};