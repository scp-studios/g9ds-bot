import time
import discord

class SpamState:
    def __init__(self) -> None:
        self.spamming = False
    
    def __str__(self) -> None:
        return self.spamming
    
    def start_spamming(self) -> None:
        self.spamming = True
    
    def stop_spamming(self) -> None:
        self.spamming = False
    
    def is_spamming(self) -> bool:
        return self.spamming

spam_state = SpamState()

async def spam(channel: discord.TextChannel, message: str, delay: float):
    spam_state.start_spamming()
    while spam_state.is_spamming():
        await channel.send(message)
        time.sleep(delay)