import discord from "discord.js"
import token from "./token.json"
import * as SlashCommands from "./slash-commands"
import * as ModCommands from "./mod-commands"

// A map of command handlers, mainly for handling commands.
let commandHandlers: Map<String, Function> = new Map()

// An array of bot developers that are allowed to and sometimes needs to access
// developer-only commands.
let botDevelopers: Array<string> = [
    "650439182204010496", // Human#7849
    "650439182204010496", // Hello56721#8083
]

// The function that is executed when the bot is ready.
function onReady() {
    console.log("[INFO]: The Client is now running woo!")
}

// This function is ran whenever any forms of interaction is created, whether
// it be a button clicked or a command. For now, it only works with commands, 
// but will eventually handle other forms of interactions as well.
function onInteractionCreate(p_interaction: discord.Interaction) {
    if (p_interaction.isCommand()) {
        // Not actually neccessary, but basically just meant for intellisense
        // and all that.
        const commandInteraction: discord.CommandInteraction = p_interaction;
        
        // We obtain the proper handler to the command from the map I created
        // earlier. This way, we don't have to create a bunch of if statements
        // to handle individual commands.
        const commandHandler: Function | undefined = commandHandlers.get(commandInteraction.commandName)
        
        // The command handler we requested may not exist, which is why we
        // needed to check if it's undefined before we call it.
        if (commandHandler != undefined) {
            commandHandler(commandInteraction)
        } else {
            commandInteraction.reply("There appears to be no handlers registered for this command.")
        }
    }
}

// Very simple. However, it doesn't fully work yet for some reasons. The bot
// response latency always reports a negative number.
function pingCommand(interaction: discord.CommandInteraction) {
    interaction.reply({ content: `Bot response latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(interaction.client.ws.ping)}ms`})
}

// A command to shutdown the bot. This responds with an ephemeral message
// like all of the other commands. I usually use ephemeral messages if other
// people don't need to see the result of the command
function shutdownCommand(interaction: discord.CommandInteraction) {
    if (botDevelopers.includes((interaction.member as discord.GuildMember).id as string)) {
        interaction.reply({ content: "Shutting down...", ephemeral: true })
        interaction.client.destroy()
    } else {
        interaction.reply("u cant do that bozo :joy_cat: :joy_cat: :joy_cat:")
    }
}

// JavaScript doesn't really need a main function, and we end up calling it at
// the end of the day anyways. However, I kind of wanted this codebase to be a
// little bit more organized, which is why I created a main function anyways.
// Plus, Visual Studio Code allows you to collapse functions, so when I don't
// want to see the stuff in the main function, I can simply collapse it, which
// is something I cannot do if I were to just keep everything in the global
// space or whatever it's called.
function main() {
    const bot: discord.Client = new discord.Client({ intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES,
        discord.Intents.FLAGS.GUILD_MEMBERS,
    ]})
    
    // Since the bot is currently in development, we're only going to be deploying
    // to our test server. However, once the bot gets it's place in the real
    // G9DS, we will deploy the commands to that server as well.
    SlashCommands.deployGuildCommands("934115241036505118", "934103484507246652", token.token)
    commandHandlers.set("ping", pingCommand)
    commandHandlers.set("shutdown", shutdownCommand)
    commandHandlers.set("kick", ModCommands.kick)
    commandHandlers.set("ban", ModCommands.ban)
    commandHandlers.set("unban", ModCommands.unban)
    
    bot.once("ready", onReady)
    bot.on("interactionCreate", onInteractionCreate)
    
    bot.login(token.token)
}

main()