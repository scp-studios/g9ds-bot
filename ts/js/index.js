"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const token_json_1 = __importDefault(require("./token.json"));
const SlashCommands = __importStar(require("./slash-commands"));
const ModCommands = __importStar(require("./mod-commands"));
let commandHandlers = new Map();
function onReady() {
    console.log("The Client is now running woo!");
}
function onInteractionCreate(p_interaction) {
    if (p_interaction.isCommand()) {
        const commandInteraction = p_interaction;
        const commandHandler = commandHandlers.get(commandInteraction.commandName);
        if (commandHandler != undefined) {
            commandHandler(commandInteraction);
        }
        else {
            commandInteraction.reply("There appears to be no handlers registered for this command.");
        }
    }
}
function pingCommand(interaction) {
    interaction.reply("Yeet!");
}
function main() {
    const bot = new discord_js_1.default.Client({ intents: [
            discord_js_1.default.Intents.FLAGS.GUILDS,
            discord_js_1.default.Intents.FLAGS.GUILD_MESSAGES,
            discord_js_1.default.Intents.FLAGS.GUILD_MEMBERS,
        ] });
    SlashCommands.deployGuildCommands("934115241036505118", "934103484507246652", token_json_1.default.token);
    commandHandlers.set("yeet", pingCommand);
    commandHandlers.set("kick", ModCommands.kick);
    bot.once("ready", onReady);
    bot.on("interactionCreate", onInteractionCreate);
    bot.login(token_json_1.default.token);
}
main();
//# sourceMappingURL=index.js.map