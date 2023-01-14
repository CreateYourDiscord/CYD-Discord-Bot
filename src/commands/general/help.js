module.exports = {
    name: "help",
    description: "Show the Help",
    description_localizations: {
      fr: "Afficher les commandes",
    },
    cooldown: 10000,
    category: "general",
    run: async (client, interaction) => {
const embed = new Discord.MessageEmbed()
.setColor("#0099ff")
.setTitle("Commandes")
.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
.setDescription("Voici les commandes disponibles :")
.addFields(
    { name: "help", value: "Afficher les commandes", inline:
    true },
    { name: "ping", value: "Ping", inline: true }
)
.setTimestamp()
.setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true })
)
interaction.reply({ embeds: [embed] })
}} 