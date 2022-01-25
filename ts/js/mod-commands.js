"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unban = exports.ban = exports.kick = void 0;
const discord_js_1 = require("discord.js");
function kick(interaction) {
    var _a;
    if (!((_a = interaction.memberPermissions) === null || _a === void 0 ? void 0 : _a.has(discord_js_1.Permissions.FLAGS.KICK_MEMBERS))) {
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
exports.kick = kick;
function ban(interaction) {
    var _a;
    if (!((_a = interaction.memberPermissions) === null || _a === void 0 ? void 0 : _a.has(discord_js_1.Permissions.FLAGS.BAN_MEMBERS))) {
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
exports.ban = ban;
function unban(interaction) {
    var _a, _b;
    if (!((_a = interaction.memberPermissions) === null || _a === void 0 ? void 0 : _a.has(discord_js_1.Permissions.FLAGS.BAN_MEMBERS))) {
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
exports.unban = unban;
