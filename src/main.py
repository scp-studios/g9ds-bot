import discord
from discord.ext import commands
from discord.ext.commands import has_permissions

import fun_utils
import welcome

import random
import time
import string
import math

import moderation_commands
import fun_commands
import utility_commands
import help_command
import other_commands

import bot_events

'''
import io
import contextlib
import textwrap
import traceback
'''

intents = discord.Intents(guilds=True, members=True, bans=True, emojis=True, voice_states=True, messages=True, reactions=True)
allowed_mentions = discord.AllowedMentions(roles=False, everyone=False, users=True)
bot = commands.Bot(command_prefix="g9 ", intents=intents, allowed_mentions=allowed_mentions, help_command=None)

botowners = [650439182204010496, 672892838995820553]

def botowner():
    def check(context):
        return context.message.author.id in botowners
    return commands.check(check)
    
welcomeChannels = {
    1: 1
}

banmsg = []

since = 0

moderation_commands.register(bot)
fun_commands.register(bot)
utility_commands.register(bot)
help_command.register(bot)
other_commands.register(bot)

bot_events.register(bot)

token = open("../token.txt", "r").read()
bot.run(token)