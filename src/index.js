const Discord = require("discord.js")
const DeployCommands = require("./deploy-commands")
const Token = require("./token.json")

DeployCommands.deployCommands()

const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]})

bot.once("ready", () => {
    console.log("The bot has logged in.")
})

bot.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    
    if (interaction.commandName == "ping")
    {
        interaction.reply("Super idol de xiao rong")
    }
})

bot.login(Token.token)