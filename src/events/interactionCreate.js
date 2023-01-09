const { Collection, PermissionsBitField } = require("discord.js");
const ms = require("ms");
const client = require("..");
const cooldowns = new Collection();

client.on("interactionCreate", async (interaction) => {
  const command = client.commands.get(interaction.commandName);
  if (interaction.type == 4 && command.autocomplete) {
    const choices = [];
    await command.autocomplete(interaction, choices);
  }

  if (!interaction.type == 2) return;
  if (!command) return client.commands.delete(interaction.commandName);

  try {
    if (command.cooldown) {
      if (cooldowns.has(`${command.name}-${interaction.user.id}`)) {
        let duration = ms(
          cooldowns.get(`${command.name}-${interaction.user.id}`) - Date.now(),
          { long: true }
        );
        return interaction.reply(client.embeds.cooldown(duration));
      }

      if (command.userPerms || command.botPerms) {
        if (
          !interaction.memberPermissions.has(
            PermissionsBitField.resolve(command.userPerms || [])
          )
        )
          return interaction.reply(
            client.embeds.fail(
              `${interaction.user}, You don’t have permission \`${command.userPerms}\`.`
            )
          );
        if (
          !interaction.guild.members.cache
            .get(client.user.id)
            .permissions.has(
              PermissionsBitField.resolve(command.botPerms || [])
            )
        )
          return interaction.reply(
            client.embeds.fail(
              `${interaction.user}, I don’t have permission \`${command.botPerms}\`.`
            )
          );
      }

      await command.run(client, interaction);
      cooldowns.set(
        `${command.name}-${interaction.user.id}`,
        Date.now() + command.cooldown
      );
      setTimeout(() => {
        cooldowns.delete(`${command.name}-${interaction.user.id}`);
      }, command.cooldown);
    } else {
      if (command.userPerms || command.botPerms) {
        if (
          !interaction.memberPermissions.has(
            PermissionsBitField.resolve(command.userPerms || [])
          )
        )
          return interaction.reply(
            client.embeds.fail(
              `${interaction.user}, You don’t have permission \`${command.userPerms}\`.`
            )
          );
        if (
          !interaction.guild.members.cache
            .get(client.user.id)
            .permissions.has(
              PermissionsBitField.resolve(command.botPerms || [])
            )
        )
          return interaction.reply(
            client.embeds.fail(
              `${interaction.user}, I don’t have permission \`${command.botPerms}\`.`
            )
          );
      }
      await command.run(client, interaction);
    }
  } catch (e) {
    console.log(e);
    return interaction.reply(client.config.emotes.error);
  }
});