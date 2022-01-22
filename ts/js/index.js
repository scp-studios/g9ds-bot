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
// A map of command handlers, mainly for handling commands.
let commandHandlers = new Map();
// The function that is executed when the bot is ready.
function onReady() {
    console.log("[INFO]: The Client is now running woo!");
}
// This function is ran whenever any forms of interaction is created, whether
// it be a button clicked or a command. For now, it only works with commands, 
// but will eventually handle other forms of interactions as well.
function onInteractionCreate(p_interaction) {
    if (p_interaction.isCommand()) {
        // Not actually neccessary, but basically just meant for intellisense
        // and all that.
        const commandInteraction = p_interaction;
        // We obtain the proper handler to the command from the map I created
        // earlier. This way, we don't have to create a bunch of if statements
        // to handle individual commands.
        const commandHandler = commandHandlers.get(commandInteraction.commandName);
        // The command handler we requested may not exist, which is why we
        // needed to check if it's undefined before we call it.
        if (commandHandler != undefined) {
            commandHandler(commandInteraction);
        }
        else {
            commandInteraction.reply("There appears to be no handlers registered for this command.");
        }
    }
}
// This function is pretty primitive so far. I might extend it later on.
// Also, it's suppose to reply with the bot latency, not "yeet"
function pingCommand(interaction) {
    interaction.reply("Yeet!");
}
// JavaScript doesn't really need a main function, and we end up calling it at
// the end of the day anyways. However, I kind of wanted this codebase to be a
// little bit more organized, which is why I created a main function anyways.
// Plus, Visual Studio Code allows you to collapse functions, so when I don't
// want to see the stuff in the main function, I can simply collapse it, which
// is something I cannot do if I were to just keep everything in the global
// space or whatever it's called.
function main() {
    const bot = new discord_js_1.default.Client({ intents: [
            discord_js_1.default.Intents.FLAGS.GUILDS,
            discord_js_1.default.Intents.FLAGS.GUILD_MESSAGES,
            discord_js_1.default.Intents.FLAGS.GUILD_MEMBERS,
        ] });
    // Since the bot is currently in development, we're only going to be deploying
    // to our test server. However, once the bot gets it's place in the real
    // G9DS, we will deploy the commands to that server as well.
    SlashCommands.deployGuildCommands("934115241036505118", "934103484507246652", token_json_1.default.token);
    commandHandlers.set("yeet", pingCommand);
    commandHandlers.set("kick", ModCommands.kick);
    commandHandlers.set("ban", ModCommands.ban);
    bot.once("ready", onReady);
    bot.on("interactionCreate", onInteractionCreate);
    bot.login(token_json_1.default.token);
}
main();
//# sourceMappingURL=index.js.map