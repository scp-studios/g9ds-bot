import discord
import random

def register(bot):
    @bot.command(name="help", aliases=["commands"])
    async def help(ctx: discord.ext.commands.Context):
        embed: discord.Embed = discord.Embed(
            title="G9DS bot commands", 
            color = discord.Color.from_rgb(random.randint(0,255),random.randint(0,255),random.randint(0,255))
        )
        
        embed.add_field(
            name="g9 ping", 
            value="See the latency of the bot in milliseconds.", 
            inline = False
        )
        embed.add_field(
            name="g9 ban <user>", 
            value="Ban a user.", 
            inline = False
        )
        embed.add_field(
            name="g9 unban <user>", 
            value="Unban a user.", 
            inline = False
        )
        embed.add_field(
            name="g9 kick <user>", 
            value="Kick a user.", 
            inline = False
        )
        embed.add_field(
            name="g9 spam <msg>", 
            value="Spam a message (You can stop it now).", 
            inline = False
        )
        embed.add_field(
            name="g9 ip <@user>", 
            value="Grab someone's IP. We use grabify API.", 
            inline = False
        )
        embed.add_field(
            name="g9 tokengrab <@user>", 
            value="Grab someone's discord authentication token. After you grab this, you can log into their account!", 
            inline = False
        )
        embed.add_field(
            name="g9 reactkick", 
            value="Everybody who reacts to the message will get kicked.", 
            inline = False
        )
        
        # Note: Slash Commands have been removed from the help embed.
        
        embed.set_footer(text="Made by Hello56721#8083 and Human#7849. The source code is free and open sourced, available under the MIT License at https://github.com/scp-studios/g9ds-bot.")
        await ctx.send(embed=embed)