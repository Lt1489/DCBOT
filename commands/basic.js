var printf = require('printf');

ping = {
  name: 'ping',
  help: 'Checks the ping to discord servers',
  usage: `!ping`,
  fn: function(msg) {
    var user = msg.author;
    const start = process.hrtime();
    msg.channel.sendMessage("Calculating ping...").then(function(editMsg) {
      const diff = process.hrtime(start);
      var ping_ms = ((diff[0] * 1000) + (diff[1] / 1000000));
      var username = msg.author.username;
      editMsg.edit(`Hello ${username} : ${printf("%6dms", ping_ms)}`);
    });
  }
}

module.exports = {
  ping
};
