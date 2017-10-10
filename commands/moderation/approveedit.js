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
const { Command } = require('discord.js-commando');

module.exports = class createRules extends Command {
	constructor(client) {
		super(client, {
			name: 'approveedit',
			group: 'moderation',
			memberName: 'approveedit',
			description: 'Replaces the approve word with a new word.',
			examples: ['createrules {oldword} {newword}', 'createrules !bonedirector !shadowcloak'],
			guildOnly: true,
			userPermissions: ['ADMINISTRATOR'],

			args: [
				{
					key: 'oldword',
					prompt: "What is the CURRENT approve word?",
					type: 'string'
				},
				{
					key: 'newword',
					prompt: "What would you like the new approve word to be?",
					type: 'string'
				}
			]
		})
	}

	async run(msg, { oldword, newword }){
		//Get the #rules channel by ID
		let rulesChannel = await this.client.channels.get("349286964580712451");
		//Get the old rules message
		let messageToEditID = await rulesChannel.lastMessageID; // Again as in createrules.js: There should only ever be one message in the rules channel
		let messageOldText = await rulesChannel.fetchMessage(messageToEditID);

		//Now to replace it
		let messageNewText = await messageOldText.content.replace(oldword, newword); // Simple search and replace.
		messageOldText.edit(messageNewText); // Edit the rules

		console.log(`!approveedit ran by ${msg.author.username}#${msg.author.discriminator} . Approve word changed from ${oldword} to ${newword} .`);
		return msg.say("Approve word properly edited.");
	}

};
