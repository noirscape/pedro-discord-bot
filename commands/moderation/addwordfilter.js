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
// Allows moderators to provide a completely new ruleset.
const {Command} = require("discord.js-commando");
const forbiddenWords = require("../../forbiddenWords.json");
const fs = require("fs");

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: "addwordfilter",
			group: "moderation",
			memberName: "addwordfilter",
			description: "Adds words to the wordfilter.",
			examples: ["addwordfilter bepis"],
			userPermissions: ["ADMINISTRATOR"],
			guildOnly: true,

			args: [
				{
					key: "badword",
					prompt: "What is the bad word that needs to be added?",
					type: "string"
				}
			]
		});
	};

	async run(msg, { badword }) {
		forbiddenWords.badWords.push(badword);
		// Write it to disk
		await fs.writeFile("./forbiddenWords.json", JSON.stringify(forbiddenWords), (err) => console.error());
		await msg.say("!");
		return process.exit();
	}
};