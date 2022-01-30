import discord

def register(bot):
    @bot.command(name="ban")
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
    
    @bot.command(name="kick", aliases=["yeet"])
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
    
    @bot.command(name="unban")
    async def unban(ctx, id: int):
        member = await bot.fetch_user(id)
        await ctx.guild.unban(member)
        await ctx.reply(f"unbanned {member}")
    
    """ 
    not sure if this works, but if it does it'll be super slow. 
    im looking for something else in the api reference
    @bot.command(name="mute", aliases=["shut"])
    async def mute(ctx, member: discord.Member, * , reason = None):
        for channel in ctx.guild.channels:
            await channel.set_permissions(member, send_messages = False)
        await ctx.send(f"oof {member} was muted\nreason: {reason}")
    """