import discord
import math
import time

def register(bot):
    @bot.event
    async def on_ready():
        global since
        since = math.floor(time.time())
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
    async def on_member_join(member: discord.Member):
        guild = member.guild
        try:
            welcomeChannelID = welcomeChannels[str(guild.id)]
            channel = bot.get_channel(int(welcomeChannelID))
            await channel.send(random.choice(welcome.joinMsgs).replace("NewUser", f"<@{member.id}>"))
        except KeyError:
            print(f"guild {guild.name} doesn't have a welcome channel. Maybe set one?")
        
    
    @bot.event
    async def on_message(message: discord.Message):
        print(f"[MESSAGE #{message.channel} from {message.author.display_name}]: {message.content}")
        try:
            await bot.process_commands(message)
        except:
            message.reply("Something went wrong. Please try again.")