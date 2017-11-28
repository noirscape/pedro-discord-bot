import discord
import yaml
from discord.ext import commands

config = yaml.safe_load(open("config.yaml"))
bot = commands.Bot(command_prefix=commands.when_mentioned_or(config["commandprefix"]), description="A moderation bot designed for the freeShop discord.")

def load_cog(cog):
	try:
		bot.load_extension(cog)
	except Exception as e:
		print('Could not load cog ' + cog)
		print(e)

@bot.event
async def on_ready():
	load_cog("cogs.debug")
	load_cog("cogs.freeshopspecific")
	load_cog("cogs.misc")
	load_cog("cogs.moderation")
	print('------------')
	print('Logged in as:')
	print(bot.user.name)
	print(bot.user.id)
	print('Using prefix:')
	print(config["commandprefix"])
	print('------------')

bot.run(config["token"])