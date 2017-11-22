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

// Rule 9
const rulenumber = 9;
const ruleDescription = "All decisions by staff are final and not up to public debate. If you have a concern, take it up privately or in #meta.";
const {Command} = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: "r" + rulenumber,
			group: "rules",
			memberName: "r" + rulenumber,
			description: "Prints rule " + rulenumber,
			examples: ["r" + rulenumber]
		});
	}

	async run(msg) {
		let ruleEmbed = new Discord.RichEmbed();

		ruleEmbed
			.setColor("#2e888e")
			.setTitle("Rule " + rulenumber)
			.setDescription(ruleDescription)
			.setFooter("This embed is part of pedro-discordjs-bot. (c) Ev1l0rd 2017", "https://cdn.discordapp.com/emojis/349312608387596299.png");

		await
		msg.embed(ruleEmbed);
	}
};