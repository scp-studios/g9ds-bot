"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
let commands = new Array();
let handlers = new Map();
function deployGuildCommands(guildID, botID, botToken) {
    const rest = new rest_1.REST({ version: "9" });
    rest.setToken(botToken);
    rest.put(v9_1.Routes.applicationGuildCommands(botID, guildID), { body: commands.map((command) => command.toJSON()) }).then(() => {
        console.log("[INFO]: Successfully registerd commands.");
    }).catch(() => {
        console.error("[ERROR]: Failed to register commands.");
    });
}
function addCommand(command, handler) {
    commands.push(command);
    handlers.set(command.name, handler);
}
function processCommand(interaction) {
    const handler = handlers.get(interaction.commandName);
    if (handler != undefined) {
        handler(interaction);
    }
    else {
        interaction.reply("There appears to be no handlers registered for this command. Please contact the bot developers if this problem persists.");
    }
}
exports.default = {
    deployGuildCommands, addCommand, processCommand
};
