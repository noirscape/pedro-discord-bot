import discord
from discord.ext import commands
import yaml

config = yaml.safe_load(open("config.yaml"))

class Moderation:
	def __init__(self,bot):
		self.bot = bot

	async def on_command_error(self,ctx,error):
		if hasattr(ctx.commands, 'on_error'):
			return
		ignored = (commands.CommandNotFound, commands.UserInputError)
		error = getattr(error,'original',error)
		if isinstance(error, ignored):
			return
		elif isinstance(error, commands.DisabledCommand):
			return await self.bot.say(f'{ctx.command} has been disabled.')
		elif isinstance(error, commands.NoPrivateMessage):
			try:
				return await self.bot.say(f'{ctx.command} cannot be used in DMs.')
			except:
				pass
		print('Ignoring exception in command {}:'.format(ctx.command), file=sys.stderr)
		traceback.print_exception(type(error),error,error.__traceback__, file=sys.stderr)

	@commands.has_role("Moderator")
	@commands.command(pass_context = True, name='kick')
	async def kickCommand(ctx, self, userName : discord.User):
		await self.bot.kick(userName)
		await self.bot.say("Kicked user " + str(userName) + "!")
		await self.bot.send_message(self.bot.get_channel('376328493732069377'), ":boot: Kicked member {0} - Kicker was {1}".format(userName,ctx.message.author))

	@kickCommand.error
	async def kick_handler(self,error,ctx)
		'''Handle errors with the kick commands (missing args)'''
		if isinstance(error, commands.MissingRequiredArgument):
			if error.param == userName:
				await self.bot.say("Missing username!")

def setup(bot):
	bot.add_cog(Moderation(bot))
	print('Loaded moderation cog...')