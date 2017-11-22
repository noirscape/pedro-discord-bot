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

// Command that tests if the bot is up and running.

const {Command} = require("discord.js-commando");

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: "pingpedro",
			group: "debug",
			memberName: "pingpedro",
			description: "Pongs back if the bot works.",
			examples: ["pingpedro"]
		});
	}

	run(msg) {
		return msg.say("Pong! Pedro is here and on duty!");
	}
};