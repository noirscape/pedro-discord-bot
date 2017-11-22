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

// Shows a QR code to the latest version of freeShop
const {Command} = require("discord.js-commando");
const Discord = require("discord.js");

module.exports = class qrCommand extends Command {
	constructor(client) {
		super(client, {
			name: "qr",
			group: "misc",
			memberName: "qr",
			description: "Show the freeShop QR code",
			examples: ["qr"]
		});
	}

	async run(msg) {
		const qr = new Discord.RichEmbed()
			.setColor("#2e888e")
			.setTitle("freeShop QR code")
			.setImage("https://gbatemp.net/attachments/qr-code-2-png.97734/")
			.setTimestamp()
			.setFooter("This embed is part of pedro-discordjs-bot. (c) Ev1l0rd 2017", "https://cdn.discordapp.com/emojis/349312608387596299.png");

		await msg.embed(qr);
	}
};