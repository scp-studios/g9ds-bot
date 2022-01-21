const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId } = require('./config.json');
const { token } = require("./token.json")

function deployCommands() {
	const commands = []
	const commandFiles = Filesystem.readdirSync("./commands").filter(file => file.endsWith(".js"))
	
	for (const file of commandFiles)
	{
	    const command = require(`./commands/${file}`)
	    bot.commands.set(command.data.name, command)
	}
	
	const rest = new REST({ version: '9' }).setToken(token);
	
	rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);
}

module.exports = { deployCommands }