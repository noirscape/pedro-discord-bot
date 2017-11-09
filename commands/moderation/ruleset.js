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
const sha1 = require("sha1");

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: "ruleset",
			group: "moderation",
			memberName: "ruleset",
			description: "Generate a new ruleset. The ruleset in an enmap for revisions. You will be given an ID to pass to ruleupdate. Note that you need to specify the full ruleset.",
			examples: ["ruleset newrules"],
			userPermissions: ["ADMINISTRATOR"],
			aliases: ["rulesedit"],
			guildOnly: true,

			args: [
				{
					key: "newrules",
					prompt: "What is the new rules post. You will need to provide the _entire rules post_.",
					type: "string"
				}
			]
		});
	}

	async run(msg, { newrules }) {
		let newRulesHash = await sha1(newrules);
		await this.client.rules.set(newRulesHash, newrules);
		await console.log(`.ruleset ran by ${msg.author.username}#${msg.author.discriminator} with hash ${newRulesHash}.`);
		return msg.say("Your new ruleset has been saved into the enmap. You can now replace the ruleset by running `rulesupdate " + newRulesHash + "`");
	}
};