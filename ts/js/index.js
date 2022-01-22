"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const token_json_1 = __importDefault(require("./token.json"));
function onReady() {
    console.log("The Client is now running woo!");
}
function main() {
    const bot = new discord_js_1.default.Client({ intents: [
            discord_js_1.default.Intents.FLAGS.GUILDS,
            discord_js_1.default.Intents.FLAGS.GUILD_MESSAGES,
            discord_js_1.default.Intents.FLAGS.GUILD_MEMBERS,
        ] });
    bot.once("ready", onReady);
    bot.login(token_json_1.default.token);
}
main();
