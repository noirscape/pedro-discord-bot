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
import yaml

config = yaml.safe_load(open("config.yaml"))


class RulesEmbeds:
    def __init__(self, bot):
        self.bot = bot

    def rulesEmbed(self, rulenumber, ruledescription):
        '''Function to quickly generate a rule'''
        footer_icon = 'https://images-ext-1.discordapp.net/external/_PkFdSwUn0fEDz8-FjOd9AGKcLAkCKOALCaR--l8twI/https/cdn.discordapp.com/emojis/349312608387596299.png'
        embed = discord.Embed(title="Rule " + rulenumber,
                              description=ruledescription)
        embed.set_footer(
            text="This embed is part of Pedro. © noirscape, 2018, AGPLv3", icon_url=footer_icon)
        return embed

    # Rule 1
    @commands.command()
    async def r1(self, ctx):
        '''Output rule 1'''
        rule1 = self.rulesEmbed(
            "1", "Don't be a jerk. Be kind to other people and help them out.\n  - This rule is also talking about messing with Paul because of the unbanmii situation")
        await ctx.send(embed=rule1)

    # Rule 2
    @commands.command()
    async def r2(self, ctx):
        '''Output rule 2'''
        rule2 = self.rulesEmbed("2", "No piracy. Don't link to warez - this includes the key site, the angel tool and any other tools that permit direct downloading from Nintendo's CDN.\n- We reserve the right to deny support to anyone suspected of using the tool for piracy.")
        await ctx.send(embed=rule2)

    @commands.command()
    async def r3(self, ctx):
        '''Output rule 3'''
        rule3 = self.rulesEmbed("3", 'No alts, at least without asking a moderator first.\n- In order to get activated, you\'ll need to say "bonedirector" in #approval and write a short approval message describing how you found this discord. Try and work the word in this message as naturally as possible.')
        await ctx.send(embed=rule3)

    @commands.command()
    async def r4(self, ctx):
        '''Output rule 4'''
        rule4 = self.rulesEmbed(
            "4", "Don't spam. This falls under rule 1 but I want to be explicit.")
        await ctx.send(embed=rule4)

    @commands.command()
    async def r5(self, ctx):
        '''Output rule 5'''
        rule5 = self.rulesEmbed("5", "Don\'t bring up drama. This falls under rule 1 but I want to be explicit.\n" +
                                "- This includes importing drama from other servers. Hash it out there or in DMs. \n" +
                                "- This rule also prohibits questions like \"will freeshop contain malware?\"(freeShop is open source: If you don\'t trust the code, you can always check it yourself and compile it.)")
        await ctx.send(embed=rule5)

    @commands.command()
    async def r6(self, ctx):
        '''Output rule 6'''
        rule6 = self.rulesEmbed("6", "NSFW is prohibited")
        await ctx.send(embed=rule6)

    @commands.command()
    async def r7(self, ctx):
        '''Output rule 7'''
        rule7 = self.rulesEmbed("7", "Don't ask for any roles")
        await ctx.send(embed=rule7)

    @commands.command()
    async def r8(self, ctx):
        '''Output rule 8'''
        rule8 = self.rulesEmbed(
            "8", "The cache updates on Wednesday. Don't ask if it has updated, or for an update. The cache maintainer has a life outside of Freeshop.")
        await ctx.send(embed=rule8)

    @commands.command()
    async def r9(self, ctx):
        '''Output rule 9'''
        rule9 = self.rulesEmbed(
            "9", "Staff direction is always to be followed no matter what. Staff may override any of these rules as they see fit. If you take issue with a staff members' decision, please take it up in #meta.")
        await ctx.send(embed=rule9)

    @commands.command()
    async def r10(self, ctx):
        '''Output rule 10'''
        rule10 = self.rulesEmbed("10", "No slurs.")
        await ctx.send(embed=rule10)


class freeShopMisc:
    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def qr(self, ctx):
        '''There's no need to use this anymore.'''
        footer_icon = 'https://images-ext-1.discordapp.net/external/_PkFdSwUn0fEDz8-FjOd9AGKcLAkCKOALCaR--l8twI/https/cdn.discordapp.com/emojis/349312608387596299.png'
        qr = discord.Embed()
        qr.set_image(url='https://i.kym-cdn.com/photos/images/original/001/010/395/f5d.png')
        qr.set_footer(
            text="This embed is part of Pedro. © noirscape, 2018, AGPLv3", icon_url=footer_icon)
        await ctx.send(embed=qr)


class SkiddoStopTakingRoles:
    def __init__(self, bot):
        self.bot = bot

    async def on_member_update(self, _, after):
        if not after.id == 191238543828451329:
            return
        msg = await self.clean_skiddo_roles_underlying()
        user = self.bot.get_user(126747960972279808)
#        await user.send("Automatically unset roles.")
#        await user.send(msg)

    @commands.command(hidden=True)
    async def clean_skiddo_roles(self, ctx):
        if ctx.author.id == 126747960972279808 or ctx.author.id == 350312129347452930:
            msg = await self.clean_skiddo_roles_underlying()
#            await ctx.send(msg)

    async def clean_skiddo_roles_underlying(self):
        guild = self.bot.get_guild(349283770689519617)
        skiddo = guild.get_member(191238543828451329)
        #await skiddo.edit(roles=[r for r in skiddo.roles if r < guild.me.top_role], reason="Cut this crap out. We can't even bloody view your profile anymore.")
        noremove = ["Best Skiddo", "Mod Mail", "Dyno", "Bepis", "Fred", "Moderator"]
        toremove = []
        for r in skiddo.roles:
            if r.name in noremove or r.id == 349283770689519617:
               continue
            toremove.append(r)
        try:
          await skiddo.remove_roles(*toremove, reason="Cut this crap out. We can't even bloody view your profile anymore.")
        except Exception as e:
          return "Couldn't remove roles.\n" + str(toremove) + "\n" + e
        finally:
          return "Removed roles manually.\n" + str(toremove)

class freeShopApprovalMirror:
    def __init__(self, bot):
        self.bot = bot

    async def on_message(self, message):
        if message.channel.id == 473231785216442369:
            webhook = await self.bot.get_channel(473239689978052608).webhooks()
            webhook = webhook[0]
            await webhook.send(content=message.clean_content, username=str(message.author), avatar_url=message.author.avatar_url)

def setup(bot):
    bot.add_cog(RulesEmbeds(bot))
    print('Loaded RulesEmbeds cog...')
    bot.add_cog(freeShopMisc(bot))
    print('Loaded freeShopMisc cog...')
    bot.add_cog(freeShopApprovalMirror(bot))
    print('Loaded freeShopApprovalMirror cog...')
#    bot.add_cog(SkiddoStopTakingRoles(bot))
#    print('Loaded SkiddoStopTakingRoles cog...')
