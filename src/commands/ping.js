const { SlashCommandBuilder } = require("@discordjs/builders")
const { CommandInteraction } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Tells you the latency of the bot."),
    async execute(interaction) {
        await interaction.reply(`🏓Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(interaction.client.ws.ping)}ms`)
    }
}