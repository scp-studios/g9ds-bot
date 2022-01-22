import discord from "discord.js"
import token from "./token.json"

function onReady() {
    console.log("The Client is now running woo!")
}

function main() {
    const bot: discord.Client = new discord.Client({ intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES,
        discord.Intents.FLAGS.GUILD_MEMBERS,
    ]})
    
    bot.once("ready", onReady)
    
    bot.login(token.token)
}

main()