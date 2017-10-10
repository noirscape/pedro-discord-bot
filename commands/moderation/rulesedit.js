// Allows moderators to provide a completely new ruleset.
const { Command } = require('discord.js-commando');
const rulesFile = '../../rules.json';
const rules = require(rulesFile);
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
		await fs.writeFile(rulesFile, JSON.stringify(rules), (err) => console.error);
		await oldMessage.edit(newrules);
		await console.log(`.rulesedit ran by ${msg.author.username}#${msg.author.discriminator}. Check rules.json for the new rules.`);
		return msg.say(`New rules properly set and saved to \`rules.json\`.`);

	}
};