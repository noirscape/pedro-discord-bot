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

// Stops the bot. Although, given that I run it with systemd, it basically acts as a restart command.
const {Command} = require("discord.js-commando");

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: "stop",
			group: "debug",
			memberName: "stop",
			description: "Stops the bot. Can only be done by the owner and in DMs. Works well with pull.",
			examples: ["stop"]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	async run(msg) {
		console.log("Exiting...");
		if (msg.channel.type === "dm") {
			await msg.say(":wave:");
			return process.exit();
		} else {
			return msg.say("You must send this in a DM. If you don't have a DM with the bot yet, type the help command.");
		}
	}
};
