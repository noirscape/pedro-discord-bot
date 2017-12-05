import discord
from discord.ext import commands
from random import randint


class Misc:
    def __init__(self, bot):
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
            # or smt to that effect
            await ctx.send("One of your values isn't an integer")

    @commands.command()
    async def prunecheck(self, ctx):
        """Checks the amount of members that will be pruned if someone were to prune inactive members."""
        guildToPruneCheck = ctx.message.guild
        oneDay = await guildToPruneCheck.estimate_pruned_members(days=1)
        sevenDays = await guildToPruneCheck.estimate_pruned_members(days=7)
        thirtyDays = await guildToPruneCheck.estimate_pruned_members(days=30)
        pruneEmbed = discord.Embed(title="Amount of members that would be pruned",
                                   type="rich",
                                   description="If you were to prune all members right now, you would lose these members:",
                                   color=0x3c6694)
        pruneEmbed.set_footer(
            text="This embed is part of Pedro. © Ev1l0rd, 2017, GPLv3")
        pruneEmbed.set_thumbnail(
            url="https://pbs.twimg.com/media/DGVJ5QPUAAQmjU8.jpg:orig")
        pruneEmbed.add_field(name="1 day", value=oneDay, inline=False)
        pruneEmbed.add_field(name="7 days", value=sevenDays, inline=False)
        pruneEmbed.add_field(name="30 days", value=thirtyDays, inline=False)
        await ctx.send(embed=pruneEmbed)


def setup(bot):
    bot.add_cog(Misc(bot))
    print("Loaded Misc cog...")
