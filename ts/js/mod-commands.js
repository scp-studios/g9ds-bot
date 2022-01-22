"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ban = exports.kick = void 0;
function kick(interaction) {
    const member = interaction.options.getMentionable("member", true);
    const reason = interaction.options.getString("reason", false);
    member.kick(reason);
    interaction.reply({ content: `Successfully kicked ${member}.`, ephemeral: true });
}
exports.kick = kick;
function ban(interaction) {
    const member = interaction.options.getMentionable("member", true);
    const reason = interaction.options.getString("reason", false);
    member.ban({ reason: reason });
    interaction.reply({ content: `Successfully banned ${member}.`, ephemeral: true });
}
exports.ban = ban;
//# sourceMappingURL=mod-commands.js.map