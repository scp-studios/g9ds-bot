import { SlashCommandBuilder, SlashCommandMentionableOption, SlashCommandStringOption } from "@discordjs/builders";
import Discord from "discord.js"
import SlashCommands from "./slash-commands"

function kick(interaction: Discord.CommandInteraction) {
    if (!(interaction.memberPermissions?.has(Discord.Permissions.FLAGS.KICK_MEMBERS))) {
        interaction.reply("u dont have kick permissions bozo :joy_cat: :joy_cat: :joy_cat:")
        return;
    }
    
    const member: Discord.GuildMember  = interaction.options.getMentionable("member", true) as Discord.GuildMember
    const reason: string = interaction.options.getString("reason", false) as string
    
    member.kick(reason).then(() => {
        interaction.reply({ content: `Successfully kicked ${member}.`, ephemeral: true })
    }).catch((error) => {
        interaction.reply({ content: `Failed to kick ${member}: ${error}`, ephemeral: true })
    })
}

function ban(interaction: Discord.CommandInteraction) {
    if (!(interaction.memberPermissions?.has(Discord.Permissions.FLAGS.BAN_MEMBERS))) {
        interaction.reply("u dont have kick permissions bozo :joy_cat: :joy_cat: :joy_cat:")
        return;
    }
    
    const member: Discord.GuildMember  = interaction.options.getMentionable("member", true) as Discord.GuildMember
    const reason: string = interaction.options.getString("reason", false) as string
    
    member.ban({ reason: reason }).then(() => {
        interaction.reply({ content: `Successfully banned ${member}.`, ephemeral: true })
    }).catch((error) => {
        interaction.reply({ content: `Failed to ban ${member}: ${error}`, ephemeral: true })
    })
}

function unban(interaction: Discord.CommandInteraction) {
    if (!(interaction.memberPermissions?.has(Discord.Permissions.FLAGS.BAN_MEMBERS))) {
        interaction.reply("u cant unban dummy :joy_cat: :joy_cat: :joy_cat:")
        return;
    }
    
    const member: Discord.GuildMember = interaction.options.getMentionable("member", true) as Discord.GuildMember
    const reason: string = interaction.options.getString("reason", false) as string
    
    interaction.guild?.members.unban(member, reason).then((member) => {
        interaction.reply({ content: `Sucessfully unbanned ${member}.`, ephemeral: true })
    }).catch((error) => {
        interaction.reply({ content: `Failed to unban ${member}: ${error}` })
    })
}










function initializeKickCommand() {
    let commandBuilder: SlashCommandBuilder = new SlashCommandBuilder();
    commandBuilder.setName("kick")
    commandBuilder.setDescription("Kick a member out of the server.")
    
    let memberOption: SlashCommandMentionableOption = new SlashCommandMentionableOption()
    memberOption.setName("member")
    memberOption.setRequired(true)
    memberOption.setDescription("The member that you would like to kick.")
    
    let reasonOption: SlashCommandStringOption = new SlashCommandStringOption()
    reasonOption.setName("reason")
    reasonOption.setRequired(false)
    reasonOption.setDescription("The reason that you want to kick the member in question.")
    
    commandBuilder.addMentionableOption(memberOption)
    commandBuilder.addStringOption(reasonOption)
    SlashCommands.addCommand(commandBuilder, kick)
}

function initializeBanCommand() {
    let commandBuilder: SlashCommandBuilder = new SlashCommandBuilder();
    commandBuilder.setName("ban")
    commandBuilder.setDescription("Ban a member from the server.")
    
    let memberOption: SlashCommandMentionableOption = new SlashCommandMentionableOption()
    memberOption.setName("member")
    memberOption.setRequired(true)
    memberOption.setDescription("The member that you would like to ban.")
    
    let reasonOption: SlashCommandStringOption = new SlashCommandStringOption()
    reasonOption.setName("reason")
    reasonOption.setRequired(false)
    reasonOption.setDescription("The reason that you want to ban the member in question.")
    
    commandBuilder.addMentionableOption(memberOption)
    commandBuilder.addStringOption(reasonOption)
    SlashCommands.addCommand(commandBuilder, ban)
}

function initializeUnbanCommand() {
    let commandBuilder: SlashCommandBuilder = new SlashCommandBuilder();
    commandBuilder.setName("unban")
    commandBuilder.setDescription("Unban a member that has been banned from the server.")
    
    let memberOption: SlashCommandMentionableOption = new SlashCommandMentionableOption()
    memberOption.setName("member")
    memberOption.setRequired(true)
    memberOption.setDescription("The member that you would like to unban.")
    
    let reasonOption: SlashCommandStringOption = new SlashCommandStringOption()
    reasonOption.setName("reason")
    reasonOption.setRequired(false)
    reasonOption.setDescription("The reason that you want to unban the member in question.")
    
    commandBuilder.addMentionableOption(memberOption)
    commandBuilder.addStringOption(reasonOption)
    SlashCommands.addCommand(commandBuilder, unban)
}

// Registers all of the moderation commands.
function initializeCommands() {
    initializeKickCommand()
    initializeBanCommand()
    initializeUnbanCommand()
}









export default {
    initializeCommands
}