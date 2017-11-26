import discord
from discord.ext import commands

bot = commands.Bot(command_prefix=commands.when_mentioned_or("%"), description="A moderation bot designed for the freeShop discord.")


@bot.event
async def on_ready():
	print('------------')
	print('Logged in as:')
	print(bot.user.name)
	print(bot.user.id)
	print('------------')

@bot.command()
async def ping():
	"""
	Ping pong! Pings the bot!
	"""
	await bot.say("pong")

bot.run("")