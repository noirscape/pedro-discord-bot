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
rulesFile = ('../../rules.json');
rules = require(rulesFile);

const { Command } = require('discord.js-commando');

module.exports = class createRules extends Command {
	constructor(client) {
		super(client, {
			name: 'createrules',
			group: 'moderation',
			memberName: 'createrules',
			description: 'Creates the rules message and deletes old ones. _Note, that this is a hardcoded message and probably should have setapproval run after it._',
			examples: ['createrules'],
			guildOnly: true
		})
	}

	hasPermission(msg) {
		if (!this.client.isOwner(msg.author)) return 'Only the bot owner can run this command';
		return true;
	}

	async run(msg){
		let rulesChannel = this.client.channels.get("349286964580712451");
        await rulesChannel.bulkDelete(2,false); //Rules should only contain one message anyway, so I'm allowed to be lazy. And if it fails, a manual remove is annoying at worst.
		let rulesList = rules.ruleSet;
		rulesChannel.send(rulesList);
		console.log("Owner ran .createrules .")
		return msg.say("Rules succesfully (re-)generated!");
	}
}