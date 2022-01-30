import discord

def register(bot):
    @bot.command(name = "welcome", aliases = ["welcomechannel", "setwelcomechannel"])
    # I would like some comments on this
    #@botowner()
    async def welcome(ctx, *, guild: discord.Guild = None, channel: discord.TextChannel = None):
        if guild is None:
            guild = ctx.guild
        elif channel is None:
            channel = ctx.channel
        
        global welcomeChannels
        welcomeChannels[str(guild.id)] = str(channel.id)
    
        await ctx.send(f"guild {guild.name}'s welcome channel is now #{channel.name}")