// Command that tests if the bot is up and running.

const { Command } = require('discord.js-commando');

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pingpedro',
			group: 'debug',
			memberName: 'pingpedro',
			description: 'Pongs back if the bot works.',
			examples: ['pingpedro']
		})
	}

	run(msg){
		return msg.say('Pong! Pedro is here and on duty!');
	}
}