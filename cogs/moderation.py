import discord
from discord.ext import commands
import sys
import traceback
import yaml

config = yaml.safe_load(open("config.yaml"))


class Moderation:
    def __init__(self, bot):
        self.bot = bot

    @commands.has_role("Moderator")
    @commands.command(pass_context=True, name='kick')
    async def kickCommand(self, ctx, userName: discord.Member):
        '''Kicks a member.
        Syntax: [p]kick <@discord.Member>
        Requires the bot to have the proper permissions. Also requires you to pass a member.
        Reserved for members with the Moderator role.'''
        await userName.kick(reason="User was kicked by {0}".format(ctx.author))
        await ctx.send("Kicked user " + str(userName) + "!")
        await self.bot.get_channel(config["logChannel"]).send(":boot: Kicked member {0} - Kicker was {1}".format(userName, ctx.author))

    @commands.has_role("Moderator")
    @commands.command(pass_context=True, name='ban')
    async def banCommand(self, ctx, userName: discord.Member):
        '''Bans a member.
        Syntax: [p]ban <@discord.Member>
        Requires the bot to have the proper permissions. Also requires you to pass a member.
        Reserved for members with the Moderator role.'''
        await userName.ban(delete_message_days=0, reason="User was banned by {0}".format(ctx.author))
        await ctx.send("Banned user " + str(userName) + "!")
        await self.bot.get_channel(config["logChannel"]).send(":hammer: Banned member {0} - Ban issuer was {1}".format(userName, ctx.author))

    @commands.has_role("Administrator")
    @commands.command(pass_context=True, name='announce')
    async def announceCommand(self, ctx, *, announcemsg: str):
        '''Announce a message
        Syntax: [p]announce <message>
        Sends the <message> to the news channel as defined in config.yaml
        '''
        await self.bot.get_channel(config["announceChannel"]).send(announcemsg)
        await ctx.send("Succesfully announced!")

    @kickCommand.error
    @banCommand.error
    async def banError(self, ctx, error):
        if isinstance(error, commands.MissingRequiredArgument):
            await ctx.send("You need to specify a user!")
        elif isinstance(error, commands.BadArgument):
            await ctx.send("That's not a user! You need to @ them.")
        elif isinstance(error, commands.CheckFailure):
            await ctx.author.send("You do not have permissions to use this command. This command is reserved for the Moderator role.")
        else:
            traceback.print_exception(
                type(error), error, error.__traceback__, file=sys.stderr)

    @announceCommand.error
    async def announceError(self, ctx, error):
        if isinstance(error, commands.MissingRequiredArgument):
            await ctx.send("You are missing a message to send!")
        elif isinstance(error, commands.CheckFailure):
            await ctx.author.send("You do not have permissions to use this command. This command is reserved for the Administrator role.")
        else:
            traceback.print_exception(
                type(error), error, error.__traceback__, file=sys.stderr)


def setup(bot):
    bot.add_cog(Moderation(bot))
    print('Loaded moderation cog...')
