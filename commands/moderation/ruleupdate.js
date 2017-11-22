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

//Creates the rules post
const {Command} = require("discord.js-commando");
const config = require("../../config.json");

module.exports = class createRules extends Command {
	constructor(client) {
		super(client, {
			name: "ruleupdate",
			group: "moderation",
			memberName: "ruleupdate",
			description: "Updates the rules messages. To do this you need an enmap. Ensure that your ruleset is correct by sending the bot the viewrules command in a DM + your hash.",
			examples: ["ruleupdate rulehash"],
			guildOnly: true,
			aliases: ["createrules"],

			args: [
				{
					key: "rulehash",
					prompt: "Please specify the SHA1-hash you got from ruleset.",
					type: "string"
				}
			]
		});
	}

	async run(msg, {rulehash}) {
		let rulesChannel = this.client.channels.get(config.rulesChannel); //Rules channel is obtained by ID
		let newRules = this.client.rules.get(rulehash);

		//await rulesChannel.bulkDelete(3, false); //First we empty the rulesChannel
		await rulesChannel.send(config.prerulesText);
		await rulesChannel.send(newRules);
		await rulesChannel.send(config.postrulesText);
		//Then we send the rules from the rules file.
		console.log("Owner ran .ruleupdate with hash " + rulehash);
		return msg.say("Rules succesfully (re-)generated!");
	}
};
