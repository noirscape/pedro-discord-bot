/*
pedro-discordjs-bot (c) 2017 Valentijn "Ev1l0rd"
A moderation bot for the freeShop server
Unless explicitly acquired and licensed from Licensor under another
license, the contents of this file are subject to the Reciprocal Public
License ("RPL") Version 1.5, or subsequent versions as allowed by the RPL,
	and You may not copy or use this file in either source code or executable
form, except in compliance with the terms and conditions of the RPL.

	All software distributed under the RPL is provided strictly on an "AS
IS" basis, WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, AND
LICENSOR HEREBY DISCLAIMS ALL SUCH WARRANTIES, INCLUDING WITHOUT
LIMITATION, ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE, QUIET ENJOYMENT, OR NON-INFRINGEMENT. See the RPL for specific
	language governing rights and limitations under the RPL.
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