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