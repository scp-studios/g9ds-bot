"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const builders_1 = require("@discordjs/builders");
const token_json_1 = __importDefault(require("./token.json"));
const slash_commands_1 = __importDefault(require("./slash-commands"));
let botDevelopers = [
    "650439182204010496",
    "650439182204010496",
];
function onReady() {
    console.log("[INFO]: The Client is now running woo!");
}
function onInteractionCreate(p_interaction) {
    if (p_interaction.isCommand()) {
        slash_commands_1.default.processCommand(p_interaction);
    }
}
function pingCommandHandler(interaction) {
    interaction.reply({ content: `Bot response latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(interaction.client.ws.ping)}ms` });
}
function shutdownCommandHandler(interaction) {
    if (botDevelopers.includes(interaction.member.id)) {
        interaction.reply({ content: "Shutting down...", ephemeral: true });
        interaction.client.destroy();
    }
    else {
        interaction.reply("u cant do that bozo :joy_cat: :joy_cat: :joy_cat:");
    }
}
function main() {
    const bot = new discord_js_1.default.Client({ intents: [
            discord_js_1.default.Intents.FLAGS.GUILDS,
            discord_js_1.default.Intents.FLAGS.GUILD_MESSAGES,
            discord_js_1.default.Intents.FLAGS.GUILD_MEMBERS,
        ] });
    let pingCommand = new builders_1.SlashCommandBuilder();
    pingCommand.setName("ping");
    pingCommand.setDescription("See the latency of the bot in milliseconds");
    slash_commands_1.default.addCommand(pingCommand, pingCommandHandler);
    let shutdownCommand = new builders_1.SlashCommandBuilder();
    shutdownCommand.setName("shutdown");
    shutdownCommand.setDescription("Shuts down the bot");
    slash_commands_1.default.addCommand(shutdownCommand, shutdownCommandHandler);
    slash_commands_1.default.deployGuildCommands("934115241036505118", "934103484507246652", token_json_1.default.token);
    bot.once("ready", onReady);
    bot.on("interactionCreate", onInteractionCreate);
    bot.login(token_json_1.default.token);
}
main();
