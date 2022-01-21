const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hello")
        .setDescription("Test command"),
    async execute(interaction) {
        await interaction.reply({ content: "Yes, sir.", ephemeral: true})
    }
}