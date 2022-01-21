const { SlashCommandBuilder,
        SlashCommandMentionableOption, 
        SlashCommandStringOption 
} = require("@discordjs/builders")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a member out of the server")
        .addMentionableOption(new SlashCommandMentionableOption().setName("member").setDescription("The member that you want to kick").setRequired(true))
        .addStringOption(new SlashCommandStringOption().setName("reason").setDescription("The reason for kicking the person out").setRequired(false)),
    async execute(interaction) {
        const member = interaction.options.getMentionable("member", true)
        const reason = interaction.options.getString("reason", false)
        
        member.kick("reason")
        
        await interaction.reply(`Oof. ${member} has been kicked out of the server.`)
    }
}