const Discord = require("discord.js")
const DeployCommands = require("./deploy-commands")
const Token = require("./token.json")
const Filesystem = require("fs")

DeployCommands.deployCommands()

const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]})

bot.commands = new Discord.Collection()
const commandFiles = Filesystem.readdirSync("./src/commands").filter(file => file.endsWith(".js"))

for (const file of commandFiles)
{
    const command = require(`./commands/${file}`)
    bot.commands.set(command.data.name, command);
}

bot.once("ready", () => {
    console.log("The bot has logged in.")
})

bot.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand())
    {
        const command = bot.commands.get(interaction.commandName)
        
        if (!command) return;
        
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            interaction.reply("There was an error executing the command.")
        }
    }
})

bot.login(Token.token)