import DiscordBuilders from "@discordjs/builders"
import DiscordREST from "@discordjs/rest"
import DiscordAPITypes from "discord-api-types/v9"

let commands: Array<DiscordBuilders.SlashCommandBuilder> = []

export function addCommand(command: DiscordBuilders.SlashCommandBuilder) {
    commands.push(command)
}

export function deployGuildCommands(guildID: string, botID: string, botToken: string) {
    const rest: DiscordREST.REST = new DiscordREST.REST({ version: "9" })
    rest.setToken(botToken)
    
    rest.put(DiscordAPITypes.Routes.applicationGuildCommands(botID, guildID), {
        body: commands.map((command) => { 
            command.toJSON() 
        })
    }).then(() => {
        console.log("[INFO]: Successfully registerd commands.")
    }).catch(() => {
        console.error("[ERROR]: Failed to register commands.")
    })
}