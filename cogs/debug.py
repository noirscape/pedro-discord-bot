import discord
from discord.ext import commands

class DebugCMDs:
	def __init__(self,bot):
		self.bot = bot

	# Ping command
	@commands.command()
	async def ping(self):
		await self.bot.say("Pong!")

def setup(bot):
	bot.add_cog(DebugCMDs(bot))