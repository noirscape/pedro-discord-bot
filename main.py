import os
import yaml
from discord.ext import commands

config = yaml.safe_load(open("config.yaml"))
bot = commands.Bot(command_prefix=commands.when_mentioned_or(
    config["commandprefix"]),
    description="A moderation bot designed for the freeShop discord.",
    pm_help=True)


def load_cog(cog):
    try:
        bot.load_extension(cog)
    except Exception as e:
        print('Could not load cog ' + cog)
        print(e)


def createDataDir():
    if not os.path.exists("data"):
        os.makedirs("data")


@bot.event
async def on_ready():
    createDataDir()
    load_cog("cogs.debug")
    load_cog("cogs.freeshopspecific")
    load_cog("cogs.misc")
    load_cog("cogs.moderation")
    load_cog("cogs.help")
    load_cog("cogs.animotes.animotes")
    print('Loaded animotes cog')
    print('------------')
    print('Logged in as:')
    print(bot.user.name)
    print(bot.user.id)
    print('Using prefix:')
    print(config["commandprefix"])
    print('------------')

bot.run(config["token"])
