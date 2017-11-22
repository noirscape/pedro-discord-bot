/*
 * pedro-discordjs-bot - A dedicated bot for the freeShop discord.
 * Copyright (C) 2017 Valentijn "ev1l0rd"
 *
 * This file is part of pedro-discordjs-bot.
 *
 * pedro-discordjs-bot is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * pedro-discordjs-bot is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with pedro-discordjs-bot.  If not, see <http://www.gnu.org/licenses/>.
 */

// Allows moderators to provide a completely new ruleset.
const {Command} = require("discord.js-commando");
const sha1 = require("sha1");

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: "ruleset",
			group: "moderation",
			memberName: "ruleset",
			description: "Generate a new ruleset. The ruleset in an enmap for revisions. You will be given an ID to pass to ruleupdate. Note that you need to specify only the rules portion. The member list/intro text will be read from config.json",
			examples: ["ruleset newrules"],
			userPermissions: ["ADMINISTRATOR"],
			aliases: ["rulesedit"],
			guildOnly: true,

			args: [
				{
					key: "newrules",
					prompt: "What is the new rules post. You will need to provide the _entire rules post_.",
					type: "string"
				}
			]
		});
	}

	async run(msg, { newrules }) {
		let newRulesHash = await sha1(newrules);
		await this.client.rules.set(newRulesHash, newrules);
		await console.log(`.ruleset ran by ${msg.author.username}#${msg.author.discriminator} with hash ${newRulesHash}.`);
		return msg.say("Your new ruleset has been saved into the enmap. You can now replace the ruleset by running `rulesupdate " + newRulesHash + "`");
	}
};