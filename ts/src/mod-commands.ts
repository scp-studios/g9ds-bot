import { APIInteractionDataResolvedGuildMember, APIRole } from "discord-api-types";
import { CommandInteraction, Guild, GuildMember, Role, User } from "discord.js";

export function kick(interaction: CommandInteraction) {
    const member: GuildMember  = interaction.options.getMentionable("member", true) as GuildMember
    const reason: string = interaction.options.getString("reason", false) as string
    
    member.kick(reason)
}

export function ban(interaction: CommandInteraction) {
    const member: GuildMember  = interaction.options.getMentionable("member", true) as GuildMember
    const reason: string = interaction.options.getString("reason", false) as string
    
    member.ban({ reason: reason })
}