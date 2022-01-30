import discord
import random
import fun_utils
import time
import string
import globals

banmsg = []

def register(bot):
    @bot.command(name = "reactkick")
    async def reactbanning(ctx):
        global banmsg
        hammer = "\N{HAMMER}"
        msg = await ctx.send("React to this message to get kicked!")
        await msg.add_reaction(hammer)
        banmsg.append(msg.id)
    
    @bot.command(name = "ipgrab", aliases = ["ip"])
    async def ip(ctx: discord.ext.commands.Context, guy: discord.Member = None):
        # If the person doesn't specificy a user, it will grab the author's IP.
        if (guy == None):
            guy = ctx.author
        
        id = guy.id
        random.seed(guy.id - 10)
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
        embed.add_field(name = "Geological Location:", value = "*Ontario, Canada*", inline = False)
        embed.add_field(name = "Coordinates:", value = "*[UPGRADE TO VIEW]*", inline = False)
        embed.add_field(name = "Postal Code:", value = "*[UPGRADE TO VIEW]*", inline = False)
        embed.set_footer(text = "powered by grabify API (real this time)")
        await msg.edit(embed=embed)
    
    @bot.command(name = "tokengrab")
    async def token(ctx, guy: discord.Member = None):
        if guy == None:
            guy = ctx.author
    
        if guy.id in botowners:
            await ctx.reply("u cant grab dat guys ip bozo :joy_cat::joy_cat::joy_cat:")
            return
        
        random.seed(guy.id)
        d1 = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(1,25))
        d2 = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(1,7))
        d3 = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(1,7))
        d4 = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(1,21))
        token = (d1+'.'+d2+'.'+d3+'-'+d4)
        msg = await ctx.send(f"Grabbing {guy.display_name}'s token...")
        time.sleep(0.5); time.sleep(0.5); time.sleep(0.5); time.sleep(0.5); time.sleep(0.5); time.sleep(0.5)
        embed = discord.Embed(title = "TOKEN GRABBER v1.2")
        embed.add_field(name = f"{guy.display_name}'s token:", value = f"`{token}`")
        await msg.edit(embed = embed)
    
    # Start spamming command
    @bot.command(name = "spam", aliases=["start_spamming"])
    async def spam(ctx, msg = "Super idol de xiao rong, dou mei ni de tian"):
        print("Starting a spam. Alright spamming:", fun_utils.spam_state.is_spamming())
        if fun_utils.spam_state.is_spamming():
            fun_utils.spam_state.stop_spamming()
        else:
            await fun_utils.spam(ctx.channel, msg, 1.0)