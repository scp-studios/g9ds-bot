import discord
import time
from discord.ext import commands
import fun_stuff
from discord.ext.commands import has_permissions

intents = discord.Intents(guilds=True, members=True, bans=True, emojis=True, voice_states=True, messages=True, reactions=True)
allowed_mentions = discord.AllowedMentions(roles=False, everyone=False, users=True)
bot = commands.Bot(command_prefix="g9 ", intents=intents, allowed_mentions=allowed_mentions, help_command=None)

@bot.command(name="ping", aliases=["latency"])
async def ping(ctx):
    await ctx.reply(f"Woah, the ping is `{str(round(bot.latency * 1000))}ms`.")

@bot.command(name = "start_spamming")
async def start_spamming(context):
    await fun_stuff.spam(context.channel, "Super idol de xiao rong, dou mei ni de tian", 1.0)

@bot.command(name="ban", aliases=["yeet"])
@has_permissions(ban_members=True)
async def ban(ctx, member: discord.Member, *, reason = None):
    try:
        await member.ban(reason = reason)
        await ctx.reply(f"yikes {member} was banned\nreason: {reason}")
    except discord.errors.Forbidden:
        await ctx.reply("i dont have permissions to ban that user")

@bot.event
async def on_ready():
    await bot.change_presence(activity=discord.Activity(type=discord.ActivityType.watching, name="you"))
    print(f'[{str(time.strftime("%H:%M:%S", time.localtime()))}] Bot is now running woo.')


token = open("../token.txt", "r").read()
bot.run(token)