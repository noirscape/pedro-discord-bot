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
//Creates the rules post
const {Command} = require("discord.js-commando");
const config = require("../../config.json");

module.exports = class createRules extends Command {
	constructor(client) {
		super(client, {
			name: "ruleupdate",
			group: "moderation",
			memberName: "ruleupdate",
			description: "Updates the rules messages. To do this you need an enmap. Ensure that your ruleset is correct by sending the bot the viewrules command in a DM + your hash.",
			examples: ["ruleupdate rulehash"],
			guildOnly: true,
			aliases: ["createrules"],

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
		let rulesChannel = this.client.channels.get(config.rulesChannel); //Rules channel is obtained by ID
		let newRules = this.client.rules.get(rulehash);
		await function () {
			if (newRules === "") {
				return msg.say("No hash with this ID found.");
			}
		};

		//await rulesChannel.bulkDelete(99999, false); //First we empty the rulesChannel
		await rulesChannel.send(config.prerulesText);
		await rulesChannel.send(newRules);
		await rulesChannel.send(config.postrulesText);
		//Then we send the rules from the rules file.
		console.log("Owner ran .ruleupdate with hash " + rulehash);
		return msg.say("Rules succesfully (re-)generated!");
	}
};