from http.client import FORBIDDEN
import discord
import time
from discord.ext import commands
import fun_stuff
import welcome
from discord.ext.commands import has_permissions
import random
import threading

intents = discord.Intents(guilds=True, members=True, bans=True, emojis=True, voice_states=True, messages=True, reactions=True)
allowed_mentions = discord.AllowedMentions(roles=False, everyone=False, users=True)
bot = commands.Bot(command_prefix="g9 ", intents=intents, allowed_mentions=allowed_mentions, help_command=None)

def botowner():
    botowners = (650439182204010496, 672892838995820553)
    def check(context):
        return context.message.author.id in botowners
    return commands.check(check)

banmsg = []

# Ping command
@bot.command(name="ping", aliases=["latency"])
async def ping(ctx):
    await ctx.reply(f"Woah, the ping is `{str(round(bot.latency * 1000))}ms`.")

# Start spamming command
@bot.command(name = "start_spamming")
async def spam(ctx, msg = "Super idol de xiao rong, dou mei ni de tian"):
    if fun_stuff.spamming:
        fun_stuff.spamming = False
    else:
        await fun_stuff.spam(ctx.channel, msg, 1.0)

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
    embed: discord.Embed = discord.Embed(title="G9DS bot commands", color = discord.Color.from_rgb(random.randint(0,255),random.randint(0,255),random.randint(0,255)))
    embed.add_field(name="g9 ping", value="See the latency of the bot in milliseconds.", inline = False)
    embed.add_field(name="g9 ban <user>", value="Ban a user.", inline = False)
    embed.add_field(name="g9 unban <user>", value="Unban a user.", inline = False)
    embed.add_field(name="g9 kick <user>", value="Kick a user.", inline = False)
    embed.add_field(name="g9 start_spamming", value="Spam a message (You can stop it now).", inline = False)
    
    # For the slash commands
    embed.add_field(name = "/kick", value = "Kick a member out of the server.", inline = False)
    embed.add_field(name = "/ban", value = "Ban a member from the server.", inline = False)
    embed.add_field(name = "/yeet", value = "For testing purposes", inline = False)
    
    embed.set_footer(text="Made by Hello56721#8083 and Human#7849. The source code is free and open sourced, available under the MIT License at https://github.com/scp-studios/g9ds-bot.")
    await ctx.send(embed=embed)

""" not sure if this works, but if it does it'll be super slow. im looking for something else in the api reference
@bot.command(name="mute", aliases=["shut"])
async def mute(ctx, member: discord.Member, * , reason = None):
    for channel in ctx.guild.channels:
        await channel.set_permissions(member, send_messages = False)
    await ctx.send(f"oof {member} was muted\nreason: {reason}")
"""

@bot.command(name = "shutdown", aliases = ["kill"])
@botowner()
async def shutdown(context):
    await context.reply("Shutting down...")
    await context.bot.close()

@bot.command(name = "reactkick")
async def reactbanning(ctx):
    global banmsg
    hammer = "\N{HAMMER}"
    msg = await ctx.send("React to this message to get kicked!")
    await msg.add_reaction(hammer)
    banmsg.append(msg.id)

@bot.event
async def on_ready():
    await bot.change_presence(activity=discord.Activity(type=discord.ActivityType.watching, name="you"))
    print(f'[{str(time.strftime("%H:%M:%S", time.localtime()))}] Bot is now running woo.')

@bot.event
async def on_reaction_add(reaction, user):
    if reaction.message.id in banmsg:
        try:
            await user.kick(reason = "Asked for it")
            await reaction.message.channel.send(f"{user} has been kicked! :joy_cat:")
        except discord.errors.Forbidden:
            0 if (user.id == 934103484507246652) else await reaction.message.channel.send(f"OH NO i dont have perms to kick {user} that sucks ngl :pouting_cat:")

@bot.event
async def on_message(message: discord.Message):
    print(f"[MESSAGE #{message.channel} from {message.author.display_name}]: {message.content}")
    await bot.process_commands(message)

token = open("../token.txt", "r").read()
bot.run(token)