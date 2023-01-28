const fs = require("fs");
const {
  PermissionsBitField,
  REST,
  Routes,
  ApplicationCommandType,
} = require("discord.js");

module.exports = (client) => {
  const rest = new REST({ version: "10" }).setToken(client.config.token);
  const commands = [];
  fs.readdirSync("./src/commands").forEach(async (dir) => {
    const cmdFiles = fs
      .readdirSync(`./src/commands/${dir}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of cmdFiles) {
      const cmd = require(`../commands/${dir}/${file}`);
      commands.push({
        name: cmd.name,
        description: cmd.description,
        type: ApplicationCommandType.ChatInput,
        options: cmd.options ? cmd.options : null,
        default_permission: cmd.default_permission
          ? cmd.default_permission
          : null,
        default_member_permissions: cmd.default_member_permissions
          ? PermissionsBitField.resolve(
              cmd.default_member_permissions
            ).toString()
          : null,
      });

      if (cmd.name) {
        client.commands.set(cmd.name, cmd);
      } else {
        console.log(`Client - Failed to register ${file.split(".js")[0]}`);
      }
    }
  });

  (async () => {
    try {
      await rest.put(
        client.config.guildID
          ? Routes.applicationGuildCommands(
              client.config.clientID,
              client.config.guildID
            )
          : Routes.applicationCommands(client.config.clientID),
        { body: commands }
      );
      console.log(`Client - Application (/) orders saved`);
    } catch (e) {
      console.log(`Client - Failed to save request (/) commands`, e);
    }
  })();
};