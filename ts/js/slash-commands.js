"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployGuildCommands = void 0;
const builders_1 = require("@discordjs/builders");
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
function deployGuildCommands(guildID, botID, botToken) {
    const rest = new rest_1.REST({ version: "9" });
    rest.setToken(botToken);
    let commands = [
        // yeet command
        new builders_1.SlashCommandBuilder()
            .setName("yeet")
            .setDescription("yeah"),
        // kick command
        new builders_1.SlashCommandBuilder()
            .setName("kick")
            .setDescription("Kick the specified member out of the server.")
            .addMentionableOption(new builders_1.SlashCommandMentionableOption()
            .setName("member")
            .setDescription("The member you wanted to kick")
            .setRequired(true))
            .addStringOption(new builders_1.SlashCommandStringOption()
            .setName("reason")
            .setDescription("The reason that member was kicked")
            .setRequired(false)),
        // ban command
        new builders_1.SlashCommandBuilder()
            .setName("ban")
            .setDescription("Ban specified member from the server.")
            .addMentionableOption(new builders_1.SlashCommandMentionableOption()
            .setName("member")
            .setDescription("The member that you wanted to ban.")
            .setRequired(true))
            .addStringOption(new builders_1.SlashCommandStringOption()
            .setName("reason")
            .setDescription("The reason that member was banned.")
            .setRequired(false))
    ].map((command) => command.toJSON());
    rest.put(v9_1.Routes.applicationGuildCommands(botID, guildID), { body: commands }).then(() => {
        console.log("[INFO]: Successfully registerd commands.");
    }).catch(() => {
        console.error("[ERROR]: Failed to register commands.");
    });
}
exports.deployGuildCommands = deployGuildCommands;
//# sourceMappingURL=slash-commands.js.map