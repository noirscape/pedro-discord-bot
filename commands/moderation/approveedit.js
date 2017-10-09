// Just edits the approval command
const { Command } = require('discord.js-commando');

module.exports = class createRules extends Command {
	constructor(client) {
		super(client, {
			name: 'approveedit',
			group: 'moderation',
			memberName: 'approveedit',
			description: 'Replaces the approve word with a new word.',
			examples: ['createrules'],
			guildOnly: true
		})
	}
}