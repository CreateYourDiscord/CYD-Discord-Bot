const fs = require("fs");
const {
  Client,
  Collection,
  Partials,
  GatewayIntentBits,
} = require("discord.js");
const { ClusterClient, getInfo } = require("discord-hybrid-sharding");

const client = new Client({
  fetchAllMembers: true,
  Mentions: {
    everyone: false,
    roles: false,
    users: false,
  },
  shards: getInfo().SHARD_LIST,
  shardCount: getInfo().TOTAL_SHARDS,
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildWebhooks,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction,
  ],
});

client.commands = new Collection();
client.cluster = new ClusterClient(client);

client.config = require("./src/.env");
client.emotes = require("./src/.env");
client.color = require("./src/.env");

module.exports = client;

fs.readdirSync("./src/handlers").forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

console.log("Bot is online! And commands are loaded!");

client.login(client.config.token);
