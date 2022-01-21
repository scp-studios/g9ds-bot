import time
import discord

spamming = False

def spam(channel: discord.TextChannel, message: str, delay: float):
    spamming = True
    while spamming:
        channel.send(message)
        time.sleep(delay)