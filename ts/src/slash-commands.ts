import { SlashCommandBuilder, SlashCommandMentionableOption, SlashCommandStringOption } from "@discordjs/builders"
import { REST } from "@discordjs/rest"
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord-api-types/v9"
import { CommandInteraction } from "discord.js"

// The array of commands to be deployed when deployGuildCommands is called
let commands: Array<SlashCommandBuilder> = new Array()

// The array of functions that are used to handle the commands.
let handlers: Map<String, Function> = new Map()

function deployGuildCommands(guildID: string, botID: string, botToken: string) {
    const rest: REST = new REST({ version: "9" })
    rest.setToken(botToken)
    
    rest.put(Routes.applicationGuildCommands(botID, guildID), { body: commands.map((command) => command.toJSON()) }).then(() => {
        console.log("[INFO]: Successfully registerd commands.")
    }).catch(() => {
        console.error("[ERROR]: Failed to register commands.")
    })
}

function addCommand(command: SlashCommandBuilder, handler: Function) {
    commands.push(command)
    handlers.set(command.name, handler)
}

function processCommand(interaction: CommandInteraction) {
    // Obtain the command handler
    const handler: Function | undefined = handlers.get(interaction.commandName)
    
    // Check if the handler retrieved is a valid handler
    if (handler != undefined) {
        handler(interaction)
    } else {
        interaction.reply("There appears to be no handlers registered for this command. Please contact the bot developers if this problem persists.")
    }
}

export default {
    deployGuildCommands, addCommand, processCommand
}