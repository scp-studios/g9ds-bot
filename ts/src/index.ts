import discord from "discord.js"
import token from "./token.json"
import * as SlashCommands from "./slash-commands"
import * as ModCommands from "./mod-commands"

let commandHandlers: Map<String, Function> = new Map()

function onReady() {
    console.log("The Client is now running woo!")
}

function onInteractionCreate(p_interaction: discord.Interaction) {
    if (p_interaction.isCommand()) {
        const commandInteraction: discord.CommandInteraction = p_interaction;
        
        const commandHandler: Function | undefined = commandHandlers.get(commandInteraction.commandName)
        
        if (commandHandler != undefined) {
            commandHandler(commandInteraction)
        } else {
            commandInteraction.reply("There appears to be no handlers registered for this command.")
        }
    }
}

function pingCommand(interaction: discord.CommandInteraction) {
    interaction.reply("Yeet!")
}

function main() {
    const bot: discord.Client = new discord.Client({ intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES,
        discord.Intents.FLAGS.GUILD_MEMBERS,
    ]})
    
    SlashCommands.deployGuildCommands("934115241036505118", "934103484507246652", token.token)
    commandHandlers.set("yeet", pingCommand)
    commandHandlers.set("kick", ModCommands.kick)
    
    bot.once("ready", onReady)
    bot.on("interactionCreate", onInteractionCreate)
    
    bot.login(token.token)
}

main()