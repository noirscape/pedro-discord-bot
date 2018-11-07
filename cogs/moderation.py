#    pedro-discord-bot - A bot for the freeShop discord
#    Copyright (C) 2018 - Valentijn "ev1l0rd"
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <https://www.gnu.org/licenses/>.
import discord
from discord.ext import commands
import sys
import traceback
import yaml
import sqlite3

config = yaml.safe_load(open("config.yaml"))


class Moderation:
    def __init__(self, bot):
        self.bot = bot
        self.softban_db = sqlite3.connect('softban.sqlite3')
        create_database(self.softban_db)

    @commands.has_role("Moderator")
    @commands.command(pass_context=True, name='kick')
    async def kickCommand(self, ctx, userName: discord.Member, *, reason=None):
        '''Kicks a member.
        Syntax: [p]kick <@discord.Member>
        Requires the bot to have the proper permissions. Also requires you to pass a member.
        Reserved for members with the Moderator role.'''
        if reason is None:
            reason = "no reason given"

        await userName.kick(reason="User was kicked by {0} - Given reason was {1}.".format(ctx.author, reason))
        await ctx.send("Kicked user " + str(userName) + "!")
        await self.bot.get_channel(config["logChannel"]).send(":boot: Kicked member {0} - Kicker was {1}. Given reason was {2}".format(userName, ctx.author, reason))

    @commands.has_role("Moderator")
    @commands.command(pass_context=True, name='ban')
    async def banCommand(self, ctx, userName: discord.Member, *, reason=None):
        '''Bans a member.
        Syntax: [p]ban <@discord.Member>
        Requires the bot to have the proper permissions. Also requires you to pass a member.
        Reserved for members with the Moderator role.'''
        if reason is None:
            reason = "no reason given"

        await userName.ban(delete_message_days=0, reason="User was banned by {0} - Given reason was {1}.".format(ctx.author, reason))
        await ctx.send("Banned user " + str(userName) + "!")
        await self.bot.get_channel(config["logChannel"]).send(":hammer: Banned member {0} - Ban issuer was {1}. Given reason was {2}".format(userName, ctx.author, reason))

    @commands.has_role("Administrator")
    @commands.command(pass_context=True, name='announce')
    async def announceCommand(self, ctx, *, announcemsg: str):
        '''Announce a message
        Syntax: [p]announce <message>
        Sends the <message> to the news channel as defined in config.yaml
        '''
        await self.bot.get_channel(config["announceChannel"]).send(announcemsg)
        await ctx.send("Succesfully announced!")

    @commands.has_role("Moderator")
    @commands.command(name='softban')
    async def softbanCommand(self, ctx, userName: int, *, reason=None):
        '''
        Softbans a member.
        Requires the bot to have the proper permissions. Also requires you to pass a member.
        A softban differs from a regular ban in that it is used to ban IDs instead of user accounts.
        Reserved for members with the Moderator role.
        '''
        if reason is None:
            reason = "no reason given"

        member = ctx.guild.get_member(userName)
        if member:
            await userName.ban(delete_message_days=0, reason="User was banned by {0} - Given reason was {1}.".format(ctx.author, reason))
            await ctx.send("Banned user " + str(userName) + "!")
            await self.bot.get_channel(config["logChannel"]).send(":hammer: Banned member {0} - Ban issuer was {1}. Given reason was {2}".format(userName, ctx.author, reason))
        else:
            cursor = self.softban_db.cursor()
            cursor.execute('SELECT user_id FROM softbans WHERE user_id=?', (userName, ))
            already_softbanned = cursor.fetchone()
            if not already_softbanned:
                cursor.execute('INSERT INTO softbans(user_id, softbanned) VALUES(?, ?)', (userName, 0))
                await self.bot.get_channel(config["logChannel"]).send(":hammer: Softbanned member {0} - Ban issuer was {1}. Given reason was {2}".format(userName, ctx.author, reason))
            else:
                cursor.execute('DELETE FROM softbans WHERE user_id=?', (userName, ))
                await self.bot.get_channel(config["logChannel"]).send(":hammer: Lifted softban on member {0} - Lifter was {1}. Given reason was {2}".format(userName, ctx.author, reason))
            self.conn.commit()

            
    @commands.has_role("Administrator")
    @commands.command()
    async def hardban(self, ctx, id: int, *, reason=None):
        if reason is None:
            reason = "no reason given"
        try:
        limitedUser = await self.bot.get_user_info(id)
        except:
            return await ctx.send("Could not find user.")
        await ctx.guild.ban(limitedUser, delete_message_days=0, reason="User was banned by {0} - Given reason was {1}.".format(ctx.author, reason)
        await self.bot.get_channel(config["logChannel"]).send(":hammer: User {0} (not in this guild) was banned. - Ban issuer was {1}. Given reason was {2}".format(limitedUser, ctx.author, reason)
                            
    @softbanCommand.error
    async def softbanError(self, ctx, error):
        if isinstance(error, commands.MissingRequiredArgument):
            await ctx.send("You need to specify a user ID!")
        elif isinstance(error, commands.BadArgument):
            await ctx.send("That's not a user ID.")
        elif isinstance(error, commands.CheckFailure):
            await ctx.author.send("You do not have permissions to use this command. This command is reserved for the Moderator role.")
        else:
            traceback.print_exception(
                type(error), error, error.__traceback__, file=sys.stderr)

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

    async def on_member_join(self, member):
        cursor = self.softban_db.cursor()
        cursor.execute('SELECT user_id FROM softbans WHERE user_id=?', (member.id, ))
        if cursor.fetchone():
            await member.ban(delete_message_days=0, reason="User was softbanned before.")
            await member.send('You have been banned from freeShop. Please contact the administration if you believe this was in error.')
            await self.bot.get_channel(config["logChannel"]).send(":hammer: Banned member {0} - Member has been softbanned before.".format(member))
        else:
            pass


def create_database(conn):
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS softbans (
            user_id integer PRIMARY KEY,
            softbanned integer
        )''')


def setup(bot):
    bot.add_cog(Moderation(bot))
    print('Loaded moderation cog...')
