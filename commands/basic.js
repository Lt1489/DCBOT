var printf = require('printf');

ping = {
  name: 'ping',
  help: 'Checks the ping to discord servers',
  usage: `!ping`,
  fn: function(msg) {
    const start = process.hrtime();
    msg.channel.sendMessage("Calculating ping...").then(function(editMsg) {
      const diff = process.hrtime(start);
      var ping_ms = ((diff[0] * 1000) + (diff[1] / 1000000));
      var username = msg.author.mention;
      editMsg.edit(`Hello ${username} : ${printf("%6dms", ping_ms)}`);
    });
  }
}

scare = {
  name: 'scare',
  help: 'Scare',
  usage: `!scare`,
  fn: function(msg, client, suffix) {
    msg.channel.sendMessage(`${suffix} BOOOOOOOOOOOOOOOOOOOOOOOOOOO!`);
  }
}

echo = {
  name: 'echo',
  help: 'Echos what the user says',
  usage: `!echo`,
  fn: function(msg, client, suffix) {
    msg.channel.sendMessage(suffix);
  }
}

voicejoin = {
  name: '',
  help: '',
  usage: `!join`,
  fn: function(msg, client, suffix) {
    var voiceChannel = msg.member.getVoiceChannel();
    voiceChannel.join();
  }
}

voicedis = {
  name: '',
  help: '',
  usage: `!disconnect`,
  fn: function(msg, bot, suffix) {
    for(i in bot.VoiceConnections) {
      var con = bot.VoiceConnections[i];
      if(con.voiceSocket.guildId == msg.guild.id) {
        con.voiceConnection.disconnect();
        break;
      }
    }
  }
}

module.exports = {
  ping,
  scare,
  echo,
  voicejoin,
  voicedis,
  voice
};
