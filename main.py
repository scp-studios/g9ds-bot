import discord
from discord.ext import commands

intents = discord.Intents(guilds=True, members=True, bans=True, emojis=True, voice_states=True, messages=True, reactions=True)
allowed_mentions = discord.AllowedMentions(roles=False, everyone=False, users=True)
bot = commands.Bot(command_prefix="g9 ", intents=intents, allowed_mentions=allowed_mentions, help_command=None)

@bot.command(name="ping", aliases=["latency"])
async def ping(ctx):
    await ctx.reply(f"woah the ping is: {str(round(bot.latency * 1000))}ms")

token = open("token.txt", "r").read()

bot.run(token)