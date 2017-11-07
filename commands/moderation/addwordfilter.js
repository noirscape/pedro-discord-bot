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
		if (!this.client.badWords.get("badList")){
			await this.client.badWords.set("badList",[]);
		}
		let badList = this.client.badWords.get("badList");
		badList = badList.push(badword);

		await this.client.badWords.set("badList", badList);

		return msg.say("Succesfully added word to blacklist!")
	}
};