from http.client import FORBIDDEN
import discord
import time
from discord.ext import commands
import fun_stuff
import welcome
from discord.ext.commands import has_permissions
import random
import threading
import math
import string

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
@bot.command(name = "spam", aliases=["start_spamming"])
async def spam(ctx, msg = "Super idol de xiao rong, dou mei ni de tian"):
    if fun_stuff.spamming:
        fun_stuff.spamming = False
    else:
        await fun_stuff.spam(ctx.channel, msg, 1.0)

# Ban command
@bot.command(name="ban", aliases=["yeet"])
async def ban(ctx: discord.ext.commands.Context, *, member: discord.Member = None, reason = None):
    if not ctx.author.permissions_in(ctx.channel).ban_members:
        await ctx.reply("u dont have ban permission bozo :joy_cat: :joy_cat: :joy_cat:")
        return
    
    if member is None:
        await ctx.reply("hello you need to mention a user for it to work")
        return
    
    try:
        await member.ban(reason = reason)
        await ctx.reply(f"yikes {member} was banned\nreason: {reason}")
    except discord.errors.Forbidden:
        await ctx.reply("i dont have permissions to ban that user")
    except:
        await ctx.reply("idk y but i cant ban that guy")

# Kick command
@bot.command(name="kick")
async def kick(ctx, *, member: discord.Member = None, reason = None):
    if not ctx.author.permissions_in(ctx.channel).kick_members:
        await ctx.reply("u dont have kick permission bozo :joy_cat: :joy_cat: :joy_cat:")
        return
    
    if member is None:
        await ctx.reply("hello you need to mention a user for it to work")
        return
    
    try:
        await member.kick(reason = reason)
        await ctx.reply(f"yikes {member} was kicked\nreason: {reason}")
    except discord.errors.Forbidden:
        await ctx.reply("i dont have permissions to kick that user")
    except:
        await ctx.reply("idk y but i cant kick that guy")

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

@bot.command(name = "ipgrab", aliases = ["ip"])
async def ip(ctx, guy: discord.Member):
    id = guy.id
    random.seed(guy.id)
    d1 = random.randint(0, 255)
    d2 = random.randint(0, 255)
    d3 = random.randint(0, 255)
    d4 = random.randint(0, 255)
    msg = await ctx.send(f"Grabbing {guy.display_name}'s IP...")
    time.sleep(1)
    time.sleep(0.5)
    await msg.edit(content = f"Tracing {guy.display_name}...")
    time.sleep(1)
    await msg.edit(content = f"Triangulating location...")
    time.sleep(1.2)
    await msg.edit(content = f"Injecting packets... [1/1]")
    time.sleep(random.random()*2)
    await msg.edit(content = f"Pinging IP address... [1/3]")
    time.sleep(random.random()*2)
    await msg.edit(content = f"Pinging IP address... [2/3]")
    time.sleep(random.random()*2)
    await msg.edit(content = f"Pinging IP address... [3/3]")
    time.sleep(0.2)
    await msg.edit(content = f"Done! Logging {guy.display_name}'s IP...")
    time.sleep(0.5)
    embed = discord.Embed(title = f"{guy.display_name}'s IP")
    embed.add_field(name='IP:', value=f"**{d1}.{d2}.{d3}.{d4}**", inline = False)
    embed.add_field(name = "Location:", value = "*[UPGRADE TO VIEW]*", inline = False)
    embed.add_field(name = "Postal Code:", value = "*[UPGRADE TO VIEW]*", inline = False)
    embed.add_field(name = "Geological Location:", value = "*[UPGRADE TO VIEW]*", inline = False)
    embed.set_footer(text = "powered by grabify API (real this time)")
    await msg.edit(embed=embed)

@bot.command(name = "tokengrab")
async def token(ctx, guy: discord.Member):
    random.seed(guy.id)
    d1 = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(1,25))
    d2 = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(1,7))
    d3 = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(1,7))
    d4 = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(1,21))
    token = (d1+'.'+d2+'.'+d3+'-'+d4)
    msg = await ctx.send(f"Grabbing {guy.display_name}'s token...")
    time.sleep(0.5); time.sleep(0.5); time.sleep(0.5); time.sleep(0.5); time.sleep(0.5); time.sleep(0.5)
    embed = discord.Embed(title = "TOKEN GRABBER v1.2")
    embed.add_field(name = f"{guy.display_name}'s token: `{token}`")
    await msg.edit()
    

@bot.event
async def on_ready():
    await bot.change_presence(activity=discord.Activity(type=discord.ActivityType.watching, name="you"))
    print(f'[{str(time.strftime("%H:%M:%S", time.localtime()))}] Bot is now running woo.')

@bot.event
async def on_reaction_add(reaction, user):
    if reaction.message.id in banmsg and user != bot.user:
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