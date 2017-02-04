process.title = 'discord_bot'

const Discordie = require('discordie')
var Commands    = require('./commands');

const Event = Discordie.Events;
const client = new Discordie({
  messageCacheLimit: 100,
  autoReconnect: true
});

const Config = {
  "bot": true,
  "prefix": '!',
  "token": "DISCORD_BOT_TOKEN",
};

// {
//   "bot": false,
//   "prefix": "!",
//   "token": "Discord API token",
//   "email": "Discord email if you arent going to use a bot account",
//   "password": "Discord password if you arent going to use a bot account"
// }

client.Dispatcher.on(Event.MESSAGE_CREATE, (c) => {
  if(c.message.content.indexOf(Config.prefix) != 0) {
    return;
  }
  var msg = c.message;
  var chunks = msg.content.split(' ')
  var cmd = chunks[0].substr(Config.prefix.length)
  var suffix = chunks.slice(1, chunks.length).join(' ').trim();

  if(cmd.length == 0) {
    return;
  }

  if (msg.content.indexOf(Config.prefix) === 0) {
    try {
      if(Commands[cmd] === undefined) {
        return;
      }
      Commands[cmd].fn(msg, client, suffix);
    } catch(err) {
      console.log(err);
    }
  }
})

client.Dispatcher.on(Event.GATEWAY_READY, () => {
  console.log('Bot Connected!');
  console.log(`Invite Link: https://discordapp.com/oauth2/authorize?&client_id=${client.User.id}&scope=bot&permissions=8`);
})

client.Dispatcher.on(Event.DISCONNECTED, (data) => {
  console.log('Connection lost:');
})

if (Config.bot) {
  client.connect({
    token: Config.token
  });
} else {
  client.connect({
    email: Config.email,
    password: Config.password
  });
}
