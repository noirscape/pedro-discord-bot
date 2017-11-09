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
