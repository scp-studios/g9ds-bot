import { SlashCommandBuilder, SlashCommandMentionableOption, SlashCommandStringOption } from "@discordjs/builders"
import { REST } from "@discordjs/rest"
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord-api-types/v9"

export function deployGuildCommands(guildID: string, botID: string, botToken: string) {
    const rest: REST = new REST({ version: "9" })
    rest.setToken(botToken)
    
    let commands: Array<RESTPostAPIApplicationCommandsJSONBody> = [
        // ping command
        new SlashCommandBuilder()
            .setName("ping")
            .setDescription("See the latency of the bot in milliseconds"),
        new SlashCommandBuilder()
            .setName("shutdown")
            .setDescription("Shuts down the bot."),
        // kick command
        new SlashCommandBuilder()
            .setName("kick")
            .setDescription("Kick the specified member out of the server.")
            .addMentionableOption(
                new SlashCommandMentionableOption()
                    .setName("member")
                    .setDescription("The member you wanted to kick")
                    .setRequired(true)
            )
            .addStringOption(
                new SlashCommandStringOption()
                    .setName("reason")
                    .setDescription("The reason that member was kicked")
                    .setRequired(false)
            ),
        // ban command
        new SlashCommandBuilder()
                .setName("ban")
                .setDescription("Ban specified member from the server.")
                .addMentionableOption(
                    new SlashCommandMentionableOption()
                        .setName("member")
                        .setDescription("The member that you wanted to ban.")
                        .setRequired(true)
                )
                .addStringOption(
                    new SlashCommandStringOption()
                        .setName("reason")
                        .setDescription("The reason that member was banned.")
                        .setRequired(false)
                ),
        // unban command
        new SlashCommandBuilder()
                .setName("unban")
                .setDescription("Unban specified member.")
                .addMentionableOption(
                    new SlashCommandMentionableOption()
                        .setName("member")
                        .setDescription("The member that you wanted to unban.")
                        .setRequired(true)
                )
                .addStringOption(
                    new SlashCommandStringOption()
                        .setName("reason")
                        .setDescription("The reason that member was unbanned.")
                        .setRequired(false)
                )
    ].map((command) => command.toJSON())
    
    rest.put(Routes.applicationGuildCommands(botID, guildID), { body: commands }).then(() => {
        console.log("[INFO]: Successfully registerd commands.")
    }).catch(() => {
        console.error("[ERROR]: Failed to register commands.")
    })
}