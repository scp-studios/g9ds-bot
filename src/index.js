const {
    Client,
    Intents
} = require("discord.js")

const {
    token
} = require("./token.json")

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]})

bot.once("ready", () => {
    console.log("The bot has logged in.")
})

bot.login(token)