import sqlite3
import hashlib
from discord.ext import commands
import yaml

config = yaml.safe_load(open("config.yaml"))


class Rules:
    def __init__(self, bot):
        self.bot = bot

    @commands.has_role("Supervisor")
    @commands.command()
    async def createrules(self, ctx, *, rules: str):
        '''Creates a ruleset'''
        database = connectDB()
        sha256 = hashlib.sha256(rules.encode()).hexdigest()
        if checkIfRuleExists(database, sha256):
            commitInRulesTable(database, sha256, rules)
            await ctx.send("Rule succesfully stored in database!\n" +
                           "Use {0} to access it with the viewer/updater!",
                           sha256)
        else:
            await ctx.send("A rule already exists with that hash!")
        closeDB(database)

    @commands.has_role("Supervisor")
    @commands.command()
    async def updaterules(self, ctx, *, hashy: str):
        '''Replaces a ruleset.
        Requires an sha256 hash from createrules to be passed.'''
        database = connectDB()
        sha256 = hashlib.sha256(hashy.encode()).hexdigest()
        if checkIfRuleExists(database, sha256):
            rules = readFromRulesTable(database, sha256)
            await self.bot.get_channel(config["rulesChannel"]).send(rules)
            await ctx.send("Rules succesfully updated!")
        else:
            await ctx.send("That hash does not exist!")
        closeDB(database)


def connectDB():
    db = sqlite3.connect("data/pedrodb.sqlite3")
    createRulesTable(db)
    return db


def closeDB(db):
    db.close()


def createRulesTable(db):
    cursor = db.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS `rules` (
        `HASH` varchar(64) NOT NULL,
        `RULESET` varchar(4000) NOT NULL,
        PRIMARY KEY (`HASH`)
        );
    ''')
    db.commit()


def commitInRulesTable(db, sha256: str, ruleset: str):
    cursor = db.cursor()
    cursor.execute('''INSERT INTO `rules` (`HASH`,`RULESET`)
        VALUES(?,?)''', (sha256, ruleset))
    print('Added new ruleset with hash ' + sha256 + '.')
    db.commit()


def checkIfRuleExists(db, sha256: str):
    cursor = db.cursor()
    cursor.execute('''SELECT `HASH` FROM `rules`''')
    for row in cursor:
        if sha256 == row[0]:
            return False
        else:
            pass
    return True


def readFromRulesTable(db, sha256: str):
    cursor = db.cursor()
    cursor.execute(
        '''SELECT `RULESET` FROM `rules` WHERE `HASH` == ?''', (sha256,))
    return cursor.fetchone()[0]


def setup(bot):
    bot.add_cog(Rules(bot))
    print('Loaded rules cog...')
