// Just edits the approval command
const { Command } = require('discord.js-commando');
const config = require('../../config.json');

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

		return msg.say("Approve word properly edited.");
	}

};
