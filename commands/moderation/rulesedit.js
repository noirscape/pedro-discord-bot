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
const { Command } = require('discord.js-commando');
rulesFile = '../../rules.json';
rules = require(rulesFile);
const fs = require("fs");

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rulesedit',
			group: 'moderation',
			memberName: 'rulesedit',
			description: 'Edits the rules. Only supervisors can use this. Note: do not run this with args.',
			examples: ['rulesedit'],
			userPermissions: ['ADMINISTRATOR'],
			guildOnly: true,

			args: [
				{
					key: 'newrules',
					prompt: 'What is the new rules post. You will need to provide the _entire rules post_.',
					type: 'string'
				}
			]
		})
	}

	async run(msg, { newrules }){
		let rulesChannel = await this.client.channels.get("349286964580712451");
		let oldRulesID = await rulesChannel.lastMessageID; // Again as in createrules.js: There should only ever be one message in the rules channel
		let oldMessage = await rulesChannel.fetchMessage(oldRulesID);

		rules.ruleSet = newrules;
		fs.writeFile(rulesFile, JSON.stringify(rules), (err) => console.error);
		await oldMessage.edit(newrules);
		await console.log(`.rulesedit ran by ${msg.author.username}#${msg.author.discriminator}. Check rules.json for the new rules.`);
		return msg.say(`New rules properly set and saved to \`rules.json\`.`);

	}
};