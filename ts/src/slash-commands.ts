import { SlashCommandBuilder } from "@discordjs/builders"
import { REST } from "@discordjs/rest"
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord-api-types/v9"

export function deployGuildCommands(guildID: string, botID: string, botToken: string) {
    const rest: REST = new REST({ version: "9" })
    rest.setToken(botToken)
    
    let commands: Array<RESTPostAPIApplicationCommandsJSONBody> = [
        new SlashCommandBuilder().setName("yeet").setDescription("yeah")
    ].map((command) => command.toJSON())
    
    rest.put(Routes.applicationGuildCommands(botID, guildID), { body: commands }).then(() => {
        console.log("[INFO]: Successfully registerd commands.")
    }).catch(() => {
        console.error("[ERROR]: Failed to register commands.")
    })
}