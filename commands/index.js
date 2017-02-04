var commands = {};

require("fs").readdirSync(__dirname).forEach(function(file_name) {
  if(file_name == "index.js")
    return;

  var file = require("./" + file_name);
  for(cmd in file)
    commands[cmd] = file[cmd];
});

module.exports = commands;
