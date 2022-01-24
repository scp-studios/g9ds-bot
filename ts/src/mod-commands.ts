import { 
    CommandInteraction,
    GuildMember,
    Permissions
} from "discord.js";

export function kick(interaction: CommandInteraction) {
    if (!(interaction.memberPermissions?.has(Permissions.FLAGS.KICK_MEMBERS))) {
        interaction.reply("u dont have kick permissions bozo :joy_cat: :joy_cat: :joy_cat:")
        return;
    }
    
    const member: GuildMember  = interaction.options.getMentionable("member", true) as GuildMember
    const reason: string = interaction.options.getString("reason", false) as string
    
    member.kick(reason).then(() => {
        interaction.reply({ content: `Successfully kicked ${member}.`, ephemeral: true })
    }).catch((error) => {
        interaction.reply({ content: `Failed to kick ${member}: ${error}`, ephemeral: true })
    })
}

export function ban(interaction: CommandInteraction) {
    if (!(interaction.memberPermissions?.has(Permissions.FLAGS.BAN_MEMBERS))) {
        interaction.reply("u dont have kick permissions bozo :joy_cat: :joy_cat: :joy_cat:")
        return;
    }
    
    const member: GuildMember  = interaction.options.getMentionable("member", true) as GuildMember
    const reason: string = interaction.options.getString("reason", false) as string
    
    member.ban({ reason: reason }).then(() => {
        interaction.reply({ content: `Successfully banned ${member}.`, ephemeral: true })
    }).catch((error) => {
        interaction.reply({ content: `Failed to ban ${member}: ${error}`, ephemeral: true })
    })
}