import Discord from "discord.js"

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

export default {
    kick, ban, unban
}