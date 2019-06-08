const fs = require('fs');
const dirCommand = './app/command';

exports.callCommand = (command, req, res) => {
    console.log(command);
    let call = dirCommand + "/" + command + '.js';
    try {
        if (fs.existsSync(call)) {
            let c = require("./command/" + command + '.js');
            c.run(req, res);
        }else {
            throw 'La commande n\'existe pas : ' + command;
        }
    } catch(err) {
        console.error(err)
    }
};
exports.getAvailiableCommand = callback => {
    fs.readdir(dirCommand, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        var commands = [];
        files.forEach(file => {
            file = file.replace('.js', '');
            commands.push(file);
        });
        callback(commands);
    });
};