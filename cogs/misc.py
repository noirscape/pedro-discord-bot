import discord
from discord.ext import commands
from random import randint

class Misc:
	def __init__(self,bot):
		self.bot = bot

	@commands.command()
	async def xdicey(self, y : int, x : int):
		'''Throws an x sided die y amount of times'''
		total = xdiceybackend(x,y)
		await self.bot.say(":game_die: Threw a " + str(y) + "d" + str(x) + " and got " + str(total) + " back")


def setup(bot):
	bot.add_cog(Misc(bot))
	print("Loaded Misc cog...")

def xdiceybackend(x: int, y : int):
	total = 0
	for diceresult in range(1,x):
		diceresult = randint(1,y)
		total += diceresult
	return total