const { ShardingManager } = require('discord.js');
const { token, options } = require('./config/config.json');

const manager = new ShardingManager('./SRC/bot.js', options);

manager.spawn();
manager.on('launch', shard => console.log(`Launched shard ${shard.id}`));