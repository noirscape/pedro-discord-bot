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

// Just edits the approval command
const {Command} = require("discord.js-commando");

module.exports = class createRules extends Command {
	constructor(client) {
		super(client, {
			name: "viewrules",
			aliases: ["editrules"],
			group: "moderation",
			memberName: "editrules",
			description: "Specify a new ruleset.",
			examples: ["editrules"],
			guildOnly: false,
			userPermissions: ["ADMINISTRATOR"],
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
		if (msg.channel.type === "dm") {
			return msg.say(this.client.rules.get(rulehash));
		} else {
			return msg.say("You must send this in a DM. If you don't have a DM with the bot yet, type the help command.");
		}
	}
};
