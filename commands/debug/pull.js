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

// Update the bot !WIP!
const {Command} = require("discord.js-commando");

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: "pull",
			group: "debug",
			memberName: "pull",
			description: "Pulls in the latest commit on the current branch. Only Owner can run this.",
			examples: ["pull"]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	async run(msg) {
		console.log("Ran .pull");
		if (msg.channel.type === "dm") {
			await msg.say("Starting pull...");
			//Note v implement this nicer v
			await require("simple-git")().pull("origin","master");
			// ^ Should be a better way ^
			return msg.say("Pull complete");
		} else {
			return msg.say("You must send this in a DM. If you don't have a DM with the bot yet, type the help command.");
		}
	}
};
