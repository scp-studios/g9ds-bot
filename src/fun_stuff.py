import time
import discord

spamming = False

async def spam(channel: discord.TextChannel, message: str, delay: float):
    spamming = True
    while spamming:
        await channel.send(message)
        time.sleep(delay)