//import discord from "discord.js"
import Discord from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"

import Token from "./token.json"
import SlashCommands from "./slash-commands"
import ModCommands from "./mod-commands"

// An array of bot developers that are allowed to and sometimes needs to access
// developer-only commands.
let botDevelopers: Array<string> = [
    "672892838995820553", // Human#7849
    "650439182204010496", // Hello56721#8083
]

// The function that is executed when the bot is ready.
function onReady() {
    console.log("[INFO]: The Client is now running woo!")
}

// This function is ran whenever any forms of interaction is created, whether
// it be a button clicked or a command. For now, it only works with commands, 
// but will eventually handle other forms of interactions as well.
function onInteractionCreate(p_interaction: Discord.Interaction) {
    if (p_interaction.isCommand()) {
        SlashCommands.processCommand(p_interaction)
    }
}

// Very simple. However, it doesn't fully work yet for some reasons. The bot
// response latency always reports a negative number.
function pingCommandHandler(interaction: Discord.CommandInteraction) {
    interaction.reply({ content: `Bot response latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(interaction.client.ws.ping)}ms`})
}

// A command to shutdown the bot. This responds with an ephemeral message
// like all of the other commands. I usually use ephemeral messages if other
// people don't need to see the result of the command
function shutdownCommandHandler(interaction: Discord.CommandInteraction) {
    if (botDevelopers.includes((interaction.member as Discord.GuildMember).id as string)) {
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
    const bot: Discord.Client = new Discord.Client({ intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
    ]})
    
    let pingCommand: SlashCommandBuilder = new SlashCommandBuilder()
    pingCommand.setName("ping")
    pingCommand.setDescription("See the latency of the bot in milliseconds")
    SlashCommands.addCommand(pingCommand, pingCommandHandler)
    
    let shutdownCommand: SlashCommandBuilder = new SlashCommandBuilder()
    shutdownCommand.setName("shutdown")
    shutdownCommand.setDescription("Shuts down the bot")
    SlashCommands.addCommand(shutdownCommand, shutdownCommandHandler)
    
    // I will add the rest later.
    
    // Since the bot is currently in development, we're only going to be deploying
    // to our test server. However, once the bot gets it's place in the real
    // G9DS, we will deploy the commands to that server as well.
    SlashCommands.deployGuildCommands("934115241036505118", "934103484507246652", Token.token)
    
    bot.once("ready", onReady)
    bot.on("interactionCreate", onInteractionCreate)
    
    bot.login(Token.token)
}

main()