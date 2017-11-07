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
let config = require("../../config.json");
let approvedConfig = config.approvedID;
let modRole = config.modID;
let adminRole = config.adminID;
let logChannelConfig = config.logChannel;
const {Command} = require("discord.js-commando");

module.exports = class createRules extends Command {
	constructor(client) {
		super(client, {
			name: "liftlockdown",
			group: "moderation",
			memberName: "liftlockdown",
			description: "Lifts a lockdown on a channel.",
			examples: ["lockdown"],
			guildOnly: true
		});
	}

	hasPermission(msg) {
		if (msg.member.roles.has(modRole) || msg.member.roles.has(adminRole)) {
			return true;
		} else {
			return "Only people marked as Supervisor or Administrator can run this command.";
		}
	}

	async run(msg) {
		let channelToLock = msg.channel;
		let logChannel = this.client.channels.get(logChannelConfig);
		let approvedRole = msg.guild.roles.get(approvedConfig);

		channelToLock.overwritePermissions(approvedRole, {
			SEND_MESSAGES: true
		}, "Channel Lockdown lifted.");

		if (this.client.lockedChannels.get(channelToLock.id)) {
			logChannel.send("🔓 User " + msg.author.toString() + "lifted a lockdown in channel" + msg.channel.toString() + ".");
		}
		await this.client.lockedChannels.set(channelToLock.id, false);
		return msg.say("Channel lockdown has been lifted.");
	}
};