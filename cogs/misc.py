import discord
from discord.ext import commands
from random import randint

class Misc:
	def __init__(self,bot):
		self.bot = bot

	@commands.command()
	async def xdicey(self, ctx, *, nums="1d6"):
		"""Throws an x sided die y amount of times"""
		split_nums = nums.split("d")
		x, y = int(split_nums[0]), int(split_nums[1])
		try:
			total = 0
			for i in range(x):
				total += randint(1, y)
			await ctx.send(f":game_die: Threw {x}d{y} and got {total} back")
		except TypeError:
			await ctx.send("One of your values isn't an integer")  # or smt to that effect

def setup(bot):
	bot.add_cog(Misc(bot))
	print("Loaded Misc cog...")