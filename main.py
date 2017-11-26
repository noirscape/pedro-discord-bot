import discord
from discord.ext import commands

bot = commands.Bot(command_prefix=commands.when_mentioned_or("%"), description="A moderation bot designed for the freeShop discord.")

def load_cog(cog):
	try:
		bot.load_extension(cog)
	except ClientException as e:
		print('No setup found in: ' + cog + ' skipping cog loading...')
	except ImportError as e:
		print('Could not load cog ' + cog)

@bot.event
async def on_ready():
	load_cog("cogs.debug")
	load_cog("cogs.rules")
	print('------------')
	print('Logged in as:')
	print(bot.user.name)
	print(bot.user.id)
	print('------------')

bot.run("")