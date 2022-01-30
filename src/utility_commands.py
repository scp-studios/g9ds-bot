def register(bot):
    @bot.command(name = "shutdown", aliases = ["kill"])
    @botowner()
    async def shutdown(context):
        await context.reply("Shutting down...")
        await context.bot.close()
    
    @bot.command(name = "info", aliases = ["botinfo"])
    async def info(ctx):
        embed = discord.Embed(title = "G9DS Bot Info")
        embed.add_field(name = "Uptime", value = f"Bot has been running since <t:{since}:R>")
        await ctx.send(embed=embed)
    
    # Ping command
    @bot.command(name="ping", aliases=["latency"])
    async def ping(ctx):
        await ctx.reply(f"Woah, the ping is `{str(round(bot.latency * 1000))}ms`.")
    
    # Commented out until we can find a way to sandbox it's execution.
    '''
    @bot.command(name = "exec")
    @botowner()
    async def exec(ctx, code):
        globals = {}
        stream = io.StringIO()
        try:
            with contextlib.redirect_stdout(stream):
                exec(f"async def function():\n{textwrap.indent(code, '    ')}", globals)
            
            ex = await globals["function"]()
            result = f"{stream.getvalue()}\n{ex}\n"
        except Exception as uhoh:
            result = "".join(traceback.format_exception(uhoh, uhoh, uhoh.__traceback__))
            embed = discord.Embed(title = 'Result')
            embed.add_field(name = 'Result', value = f"```python\n{result}```")
            await ctx.send(embed=embed)
    '''