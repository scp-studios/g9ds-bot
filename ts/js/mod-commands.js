"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const discord_js_1 = __importDefault(require("discord.js"));
const slash_commands_1 = __importDefault(require("./slash-commands"));
function kick(interaction) {
    var _a;
    if (!((_a = interaction.memberPermissions) === null || _a === void 0 ? void 0 : _a.has(discord_js_1.default.Permissions.FLAGS.KICK_MEMBERS))) {
        interaction.reply("u dont have kick permissions bozo :joy_cat: :joy_cat: :joy_cat:");
        return;
    }
    const member = interaction.options.getMentionable("member", true);
    const reason = interaction.options.getString("reason", false);
    member.kick(reason).then(() => {
        interaction.reply({ content: `Successfully kicked ${member}.`, ephemeral: true });
    }).catch((error) => {
        interaction.reply({ content: `Failed to kick ${member}: ${error}`, ephemeral: true });
    });
}
function ban(interaction) {
    var _a;
    if (!((_a = interaction.memberPermissions) === null || _a === void 0 ? void 0 : _a.has(discord_js_1.default.Permissions.FLAGS.BAN_MEMBERS))) {
        interaction.reply("u dont have kick permissions bozo :joy_cat: :joy_cat: :joy_cat:");
        return;
    }
    const member = interaction.options.getMentionable("member", true);
    const reason = interaction.options.getString("reason", false);
    member.ban({ reason: reason }).then(() => {
        interaction.reply({ content: `Successfully banned ${member}.`, ephemeral: true });
    }).catch((error) => {
        interaction.reply({ content: `Failed to ban ${member}: ${error}`, ephemeral: true });
    });
}
function unban(interaction) {
    var _a, _b;
    if (!((_a = interaction.memberPermissions) === null || _a === void 0 ? void 0 : _a.has(discord_js_1.default.Permissions.FLAGS.BAN_MEMBERS))) {
        interaction.reply("u cant unban dummy :joy_cat: :joy_cat: :joy_cat:");
        return;
    }
    const member = interaction.options.getMentionable("member", true);
    const reason = interaction.options.getString("reason", false);
    (_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.members.unban(member, reason).then((member) => {
        interaction.reply({ content: `Sucessfully unbanned ${member}.`, ephemeral: true });
    }).catch((error) => {
        interaction.reply({ content: `Failed to unban ${member}: ${error}` });
    });
}
function initializeKickCommand() {
    let commandBuilder = new builders_1.SlashCommandBuilder();
    commandBuilder.setName("kick");
    commandBuilder.setDescription("Kick a member out of the server.");
    let memberOption = new builders_1.SlashCommandMentionableOption();
    memberOption.setName("member");
    memberOption.setRequired(true);
    memberOption.setDescription("The member that you would like to kick.");
    let reasonOption = new builders_1.SlashCommandStringOption();
    reasonOption.setName("reason");
    reasonOption.setRequired(false);
    reasonOption.setDescription("The reason that you want to kick the member in question.");
    commandBuilder.addMentionableOption(memberOption);
    commandBuilder.addStringOption(reasonOption);
    slash_commands_1.default.addCommand(commandBuilder, kick);
}
function initializeBanCommand() {
    let commandBuilder = new builders_1.SlashCommandBuilder();
    commandBuilder.setName("ban");
    commandBuilder.setDescription("Ban a member from the server.");
    let memberOption = new builders_1.SlashCommandMentionableOption();
    memberOption.setName("member");
    memberOption.setRequired(true);
    memberOption.setDescription("The member that you would like to ban.");
    let reasonOption = new builders_1.SlashCommandStringOption();
    reasonOption.setName("reason");
    reasonOption.setRequired(false);
    reasonOption.setDescription("The reason that you want to ban the member in question.");
    commandBuilder.addMentionableOption(memberOption);
    commandBuilder.addStringOption(reasonOption);
    slash_commands_1.default.addCommand(commandBuilder, ban);
}
function initializeUnbanCommand() {
    let commandBuilder = new builders_1.SlashCommandBuilder();
    commandBuilder.setName("unban");
    commandBuilder.setDescription("Unban a member that has been banned from the server.");
    let memberOption = new builders_1.SlashCommandMentionableOption();
    memberOption.setName("member");
    memberOption.setRequired(true);
    memberOption.setDescription("The member that you would like to unban.");
    let reasonOption = new builders_1.SlashCommandStringOption();
    reasonOption.setName("reason");
    reasonOption.setRequired(false);
    reasonOption.setDescription("The reason that you want to unban the member in question.");
    commandBuilder.addMentionableOption(memberOption);
    commandBuilder.addStringOption(reasonOption);
    slash_commands_1.default.addCommand(commandBuilder, unban);
}
function initializeCommands() {
    initializeKickCommand();
    initializeBanCommand();
    initializeUnbanCommand();
}
exports.default = {
    initializeCommands
};
//# sourceMappingURL=mod-commands.js.map