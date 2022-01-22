const DiscordBuilders = require("@discordjs/builders")

module.exports = {
    data: new DiscordBuilders.SlashCommandBuilder()
          .setName("shutdown")
          .setDescription("Shuts down the bot"),
    async execute(interaction)
    {
        if (interaction.member.id == "650439182204010496" || interaction.member.id == "672892838995820553") {
            interaction.reply({ content: "Shutting down...", ephemeral: true })
            interaction.client.destroy()
        } else {
            interaction.reply("ur not 1 of the devs so u cant shut down bot bozo :joy_cat: :joy_cat: :joy_cat:")
        }
    }
}