import discord
import time
from discord.ext import commands
import fun_stuff
import welcome
from discord.ext.commands import has_permissions
import random

intents = discord.Intents(guilds=True, members=True, bans=True, emojis=True, voice_states=True, messages=True, reactions=True)
allowed_mentions = discord.AllowedMentions(roles=False, everyone=False, users=True)
bot = commands.Bot(command_prefix="g9 ", intents=intents, allowed_mentions=allowed_mentions, help_command=None)

# Ping command
@bot.command(name="ping", aliases=["latency"])
async def ping(ctx):
    await ctx.reply(f"Woah, the ping is `{str(round(bot.latency * 1000))}ms`.")

# Start spamming command
@bot.command(name = "start_spamming")
async def start_spamming(ctx):
    await fun_stuff.spam(ctx.channel, "Super idol de xiao rong, dou mei ni de tian", 1.0)

# Ban command
@bot.command(name="ban", aliases=["yeet"])
@has_permissions(ban_members=True)
async def ban(ctx, member: discord.Member, *, reason = None):
    try:
        await member.ban(reason = reason)
        await ctx.reply(f"yikes {member} was banned\nreason: {reason}")
    except discord.errors.Forbidden:
        await ctx.reply("i dont have permissions to ban that user")
    except discord.ext.commands.errors.MissingRequiredArgument:
        await ctx.reply("You forgot a missing argument bozo")
    except:
        await ctx.reply("idk y but i cant ban that guy")

# Kick command
@bot.command(name="kick")
@has_permissions(kick_members=True)
async def kick(ctx, member: discord.Member,*, reason = None):
    try:
        await member.kick(reason = reason)
        await ctx.reply(f"yikes {member} was kicked\nreason: {reason}")
    except discord.errors.Forbidden:
        await ctx.reply("i dont have permissions to kick that user")

# Unban command
@bot.command(name="unban")
@has_permissions(ban_members=True)
async def unban(ctx, id: int):
    member = await bot.fetch_user(id)
    await ctx.guild.unban(member)
    await ctx.reply(f"unbanned {member}")

@bot.command(name="help", aliases=["commands"])
async def help(ctx: discord.ext.commands.Context):
    embed = discord.Embed(title="G9DS bot commands", color = discord.Color.from_rgb(random.randint(0,255),random.randint(0,255),random.randint(0,255)))
    embed.add_field(name="g9 ping", value="See the latency of the bot in milliseconds.\n", inline = False)
    embed.add_field(name="g9 start_spamming", value="Start spamming (you can't stop it).\n", inline = False)
    embed.add_field(name="g9 kick <user>", value="Kick someone out of the server.\n", inline = False)
    embed.add_field(name="g9 ban <user>", value="Ban someone from the server\n", inline = False)
    embed.add_field(name="g9 unban <user>", value="Revoke a previous ban\n", inline = False)
    
    await ctx.reply(embed=embed)

@bot.event
async def on_ready():
    await bot.change_presence(activity=discord.Activity(type=discord.ActivityType.watching, name="you"))
    print(f'[{str(time.strftime("%H:%M:%S", time.localtime()))}] Bot is now running woo.')

token = open("../token.txt", "r").read()
bot.run(token)